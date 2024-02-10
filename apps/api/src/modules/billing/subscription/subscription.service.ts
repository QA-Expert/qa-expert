import {
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Price, Subscription, SubscriptionStatus } from './subscription.schema';
import { SubscriptionInput } from './subscription.input';
import { PaymentProviderService } from '../payment-provider/payment-provider.service';
import { PaymentMethodService } from '../payment-method/payment-method.service';
import Stripe from 'stripe';

@Injectable()
export class SubscriptionService {
  private readonly logger = new Logger(SubscriptionService.name);

  constructor(
    @InjectModel(Subscription.name)
    private model: Model<Subscription>,
    @Inject(forwardRef(() => PaymentProviderService))
    private readonly servicePaymentProvider: PaymentProviderService,
    @Inject(forwardRef(() => PaymentMethodService))
    private readonly servicePaymentMethod: PaymentMethodService,
  ) {}

  async findOneByUserId(userId: string) {
    return await this.model
      .findOne({
        user: {
          _id: userId,
        },
      })
      .exec();
  }

  async findOneByExternalId(externalId: string) {
    return await this.model
      .findOne({
        externalId,
      })
      .exec();
  }

  async retrieve(userId: string): Promise<Subscription | null> {
    const subscriptionFromDb = await this.findOneByUserId(userId);

    if (!subscriptionFromDb) {
      return null;
    }

    try {
      const result =
        await this.servicePaymentProvider.client.subscriptions.retrieve(
          subscriptionFromDb.externalId,
          {
            expand: ['latest_invoice'],
          },
        );

      const currentPeriodStart = new Date(result.current_period_start * 1000);
      const currentPeriodEnd = new Date(result.current_period_end * 1000);

      return {
        ...subscriptionFromDb.toObject(),
        currentPeriodStart,
        currentPeriodEnd,
      } as Subscription;
    } catch (error) {
      this.logger.error((error as Error).message, error);

      throw error;
    }
  }

  async getPrices(): Promise<Price[]> {
    const result = await this.servicePaymentProvider.client.prices.list();

    return result.data.map((price) => ({
      currency: price.currency,
      id: price.id,
      amount: price.unit_amount,
    }));
  }

  async create(data: SubscriptionInput, userId: string) {
    const paymentMethodFromDb =
      await this.servicePaymentMethod.findOneByUserId(userId);

    if (!paymentMethodFromDb) {
      throw new NotFoundException('Failed to find saved payment method');
    }

    const subscription =
      await this.servicePaymentProvider.client.subscriptions.create({
        customer: paymentMethodFromDb.externalCustomerId,
        items: [{ price: data.priceId }],
        collection_method: 'charge_automatically',
        coupon: data.couponId,
        expand: ['latest_invoice'],
      });

    if (subscription.status !== 'active' && subscription.id) {
      await this.servicePaymentProvider.client.subscriptions.cancel(
        subscription.id,
      );

      throw new Error(
        'Failed to create new subscription. There might be issue with processing payment.',
      );
    }

    const newSub: Partial<Subscription> = {
      externalId: subscription.id,
      status: SubscriptionStatus.ACTIVE,
      user: new mongoose.Types.ObjectId(userId),
      priceId: data.priceId,
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      createdBy: new mongoose.Types.ObjectId(userId),
      updatedBy: new mongoose.Types.ObjectId(userId),
    };

    const model = new this.model(newSub);

    if (!model) {
      throw new Error('Failed to create new subscription');
    }

    return await model.save();
  }

  /**
   *
   * How activation works:
   *
   * 1. We get sub from our DB
   * 2. We check that payment method was added - defensive coding
   * 3. If db sub currentPeriodEnd <= today then we want to create sub with next billing date of currentPeriodEnd AND make proration_behavior to none
   * 4. If db sub currentPeriodEnd > today then we want to create new sub
   * 5. Update db sub with new currentPeriodEnd and currentPeriodStart
   */
  async activate(externalId: string) {
    const subscriptionFromDb = await this.findOneByExternalId(externalId);
    if (!subscriptionFromDb) {
      throw new NotFoundException(
        'Failed to find existing subscription to activate',
      );
    }

    if (subscriptionFromDb.status === SubscriptionStatus.ACTIVE) {
      throw new NotFoundException('Existing subscription is marked as active');
    }

    const userId = subscriptionFromDb.user._id;

    const paymentMethodFromDb = await this.servicePaymentMethod.findOneByUserId(
      userId.toString(),
    );

    if (!paymentMethodFromDb) {
      throw new NotFoundException('Failed to find saved payment method');
    }

    try {
      const today = new Date();
      const currentEndPeriod = subscriptionFromDb.currentPeriodEnd;

      let subscription: Stripe.Subscription;

      if (currentEndPeriod <= today) {
        subscription =
          await this.servicePaymentProvider.client.subscriptions.create({
            customer: paymentMethodFromDb?.externalCustomerId,
            items: [{ price: subscriptionFromDb.priceId }],
            collection_method: 'charge_automatically',
            proration_behavior: 'none',
            billing_cycle_anchor: currentEndPeriod.getTime() / 1000,
          });
      } else {
        subscription =
          await this.servicePaymentProvider.client.subscriptions.create({
            customer: paymentMethodFromDb?.externalCustomerId,
            items: [{ price: subscriptionFromDb.priceId }],
            collection_method: 'charge_automatically',
          });
      }

      if (subscription.status !== 'active' && subscription.id) {
        await this.servicePaymentProvider.client.subscriptions.cancel(
          subscription.id,
        );

        throw new Error(
          'Failed to activate subscription. There might be issue with processing payment.',
        );
      }

      return await this.model
        .findByIdAndUpdate(
          subscriptionFromDb._id,
          {
            externalId: subscription.id,
            status: SubscriptionStatus.ACTIVE,
            updatedBy: userId,
            currentPeriodStart: new Date(
              subscription.current_period_start * 1000,
            ),
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
            cancelationReason: null,
          },
          { new: true },
        )
        .exec();
    } catch (error) {
      this.logger.error((error as Error).message, error);

      throw error;
    }
  }

  /**
   *
   * 1. Find existing subscription by userId in our db
   * 2. Retrieve subscription from Payment Provider. We will use it to get current start and current end periods
   * 3. Cancel subscription on Payment Provider side
   * 4. Update subscription in our db with new current start and current end periods and status CANCELED
   *
   * IMPORTANT: we save start and end period information for the case when User wants to activate sub
   * In that case we will look into end period date and compare it with today to figure out if we need to just
   * create new sub with end period date as first billing date OR we just create new sub with current start and future end period
   */
  async cancel(externalId: string, reason: string) {
    const subscriptionFromDb = await this.findOneByExternalId(externalId);

    if (!subscriptionFromDb) {
      throw new Error('Failed to find existing subscription to cancel');
    }

    const userId = subscriptionFromDb.user._id;

    try {
      const subscription =
        await this.servicePaymentProvider.client.subscriptions.retrieve(
          subscriptionFromDb.externalId,
        );

      const result =
        await this.servicePaymentProvider.client.subscriptions.cancel(
          subscriptionFromDb.externalId,
        );

      if (result.status !== 'canceled') {
        throw new Error(
          'Failed to cancel subscription on Payment provider side',
        );
      }

      return await this.model
        .findByIdAndUpdate(
          subscriptionFromDb._id,
          {
            cancelationReason: reason,
            currentPeriodStart: new Date(
              subscription.current_period_start * 1000,
            ),
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
            status: SubscriptionStatus.CANCELED,
            updatedBy: userId,
          },
          { new: true },
        )
        .exec();
    } catch (error) {
      this.logger.error((error as Error).message, error);

      throw error;
    }
  }
}
