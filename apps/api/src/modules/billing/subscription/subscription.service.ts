import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Subscription, SubscriptionStatus } from './subscription.schema';
import { SubscriptionInput } from './subscription.input';
import { PaymentProviderService } from '../payment-provider/payment-provider.service';
import { PaymentMethodService } from '../payment-method/payment-method.service';

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
        add_invoice_items: [{ price: data.priceId }],
        /**
         * @url https://stripe.com/docs/billing/subscriptions/billing-cycle#use
         */
        billing_cycle_anchor_config: {
          day_of_month: 31,
        },
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

  async activate(_id: string) {
    const subscriptionFromDb = await this.model.findById(_id).exec();

    if (!subscriptionFromDb) {
      throw new NotFoundException(
        'Failed to find existing subscription to activate',
      );
    }

    await this.servicePaymentProvider.client.subscriptions.resume(
      subscriptionFromDb?.externalId,
      {
        billing_cycle_anchor: 'now',
      },
    );

    return await this.model
      .findByIdAndUpdate(
        _id,
        {
          status: SubscriptionStatus.ACTIVE,
          updatedBy: new mongoose.Types.ObjectId(subscriptionFromDb.user._id),
        },
        { new: true },
      )
      .exec();
  }

  async cancel(_id: string) {
    const subscription = await this.model.findById(_id).exec();

    if (!subscription) {
      throw new Error('Subscription not found');
    }

    const result =
      await this.servicePaymentProvider.client.subscriptions.cancel(
        subscription.externalId,
      );

    if (result.status !== 'canceled') {
      throw new Error('Failed to cancel subscription on Payment provider side');
    }

    return await this.model
      .findByIdAndUpdate(
        _id,
        {
          status: SubscriptionStatus.INACTIVE,
          updatedBy: new mongoose.Types.ObjectId(subscription.user._id),
        },
        { new: true },
      )
      .exec();
  }
}
