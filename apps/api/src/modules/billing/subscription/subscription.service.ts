import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Price, Subscription, SubscriptionStatus } from './subscription.schema';
import { SubscriptionInput } from './subscription.input';
import { PaymentProviderService } from '../payment-provider/payment-provider.service';
import { PaymentMethodService } from '../payment-method/payment-method.service';
import { SubscriptionOutput } from './subscription.output';
import Stripe from 'stripe';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectModel(Subscription.name)
    private model: Model<Subscription>,
    private readonly servicePaymentProvider: PaymentProviderService,
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

  async retrieve(userId: string): Promise<SubscriptionOutput | null> {
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

      const lastInvoiceDate = (result.latest_invoice as Stripe.Invoice)?.created
        ? new Date((result.latest_invoice as Stripe.Invoice).created)
        : null;
      const nextInvoiceDate = result.next_pending_invoice_item_invoice
        ? new Date(result.next_pending_invoice_item_invoice)
        : null;

      return {
        _id: subscriptionFromDb._id,
        lastInvoiceDate,
        nextInvoiceDate,
        status: subscriptionFromDb.status,
      };
    } catch (error) {
      console.log(error);
      throw new Error('Failed to retrieve subscription from Subscription');
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
        customer: paymentMethodFromDb?.externalCustomerId,
        items: [{ price: data.priceId }],
        collection_method: 'charge_automatically',
        coupon: data.couponId,
      });

    const newSub: Partial<Subscription> = {
      externalId: subscription.id,
      status: SubscriptionStatus.ACTIVE,
      user: new mongoose.Types.ObjectId(userId),
      createdBy: new mongoose.Types.ObjectId(userId),
      updatedBy: new mongoose.Types.ObjectId(userId),
    };

    const model = new this.model(newSub);

    if (!model) {
      throw new Error('Failed to create new subscription');
    }

    return await model.save();
  }

  async activate(userId: string) {
    const subscriptionFromDb = await this.findOneByUserId(userId);

    if (!subscriptionFromDb) {
      throw new NotFoundException(
        'Failed to find existing subscription to activate',
      );
    }

    const paymentMethodFromDb =
      await this.servicePaymentMethod.findOneByUserId(userId);

    if (!paymentMethodFromDb) {
      throw new NotFoundException('Failed to find saved payment method');
    }

    await this.servicePaymentProvider.client.subscriptions.resume(
      subscriptionFromDb?.externalId,
      {
        billing_cycle_anchor: 'now',
      },
    );

    return await this.model
      .findByIdAndUpdate(
        subscriptionFromDb._id,
        {
          status: SubscriptionStatus.ACTIVE,
          updatedBy: new mongoose.Types.ObjectId(userId),
        },
        { new: true },
      )
      .exec();
  }

  async cancel(userId: string) {
    const subscriptionFromDb = await this.findOneByUserId(userId);

    if (!subscriptionFromDb) {
      throw new Error('Failed to find existing subscription to cancel');
    }

    const result =
      await this.servicePaymentProvider.client.subscriptions.cancel(
        subscriptionFromDb.externalId,
      );

    if (result.status !== 'canceled') {
      throw new Error('Failed to cancel subscription on Payment provider side');
    }

    return await this.model
      .findByIdAndUpdate(
        subscriptionFromDb._id,
        {
          status: SubscriptionStatus.CANCELED,
          updatedBy: new mongoose.Types.ObjectId(userId),
        },
        { new: true },
      )
      .exec();
  }
}
