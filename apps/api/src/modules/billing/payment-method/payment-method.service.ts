import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaymentMethod } from './payment-method.schema';
import { EncryptionService } from 'src/modules/encryption/encryption.service';
import mongoose, { Model } from 'mongoose';
import { PaymentProviderService } from '../payment-provider/payment-provider.service';
import { PaymentMethodInput } from './payment-method.input';
import { User } from 'src/modules/users/user.schema';
import { PaymentMethodOutput } from './payment-method.output';
import e from 'express';

@Injectable()
export class PaymentMethodService {
  constructor(
    @InjectModel(PaymentMethod.name)
    private model: Model<PaymentMethod>,
    private readonly encryptionService: EncryptionService,
    private readonly servicePaymentProvider: PaymentProviderService,
  ) {}

  async findOneByUserId(userId: string) {
    const { decryptData } = this.encryptionService;
    const encryptedData = await this.model
      .findOne({
        user: {
          _id: userId,
        },
      })
      .exec();

    if (!encryptedData) {
      return null;
    }

    const decryptedData: PaymentMethod = {
      ...encryptedData,
      externalCustomerId: decryptData(encryptedData.externalCustomerId),
      externalId: decryptData(encryptedData.externalId),
    } as PaymentMethod;

    return decryptedData;
  }

  async retrieve(userId: string) {
    const paymentMethodFromDb = await this.findOneByUserId(userId);

    if (!paymentMethodFromDb) {
      return null;
    }

    const { externalCustomerId, externalId } = paymentMethodFromDb;

    const paymentMethod =
      await this.servicePaymentProvider.client.customers.retrievePaymentMethod(
        externalCustomerId,
        externalId,
      );

    if (!paymentMethod || !paymentMethod.card) {
      return null;
    }

    const result: PaymentMethodOutput = {
      cardBrand: paymentMethod.card.brand,
      cardLast4: paymentMethod.card.last4,
    };

    return result;
  }

  async create(data: PaymentMethodInput, user: User) {
    try {
      // We create new customer with payment provider and attach payment method to customer by default so we can charge for subscription
      const customer =
        await this.servicePaymentProvider.client.customers.create({
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          payment_method: data.paymentMethodId,
          // @url https://stripe.com/docs/api/customers/object#customer_object-invoice_settings-default_payment_method
          // setting default payment method that is used to pay for sub
          invoice_settings: {
            default_payment_method: data.paymentMethodId,
          },
        });

      const newPaymentMethod: Partial<PaymentMethod> = {
        user: new mongoose.Types.ObjectId(user._id),
        externalCustomerId: this.encryptionService.encryptData(customer.id),
        externalId: this.encryptionService.encryptData(data.paymentMethodId),
        createdBy: new mongoose.Types.ObjectId(user._id),
        updatedBy: new mongoose.Types.ObjectId(user._id),
      };

      const model = new this.model(newPaymentMethod);

      if (!model) {
        throw new Error('Failed to create new payment method');
      }

      return await model.save();
    } catch (error) {
      console.log(error);
      throw new Error('Failed to create payment method with Payment provider');
    }
  }

  async update(data: PaymentMethodInput, user: User) {
    try {
      const paymentMethodFromDb = await this.findOneByUserId(user._id);

      if (!paymentMethodFromDb) {
        throw new NotFoundException('Failed to find saved payment method');
      }

      await this.servicePaymentProvider.client.customers.update(
        paymentMethodFromDb?.externalCustomerId,
        {
          name: `${user.firstName} ${user.lastName}`,
          invoice_settings: {
            default_payment_method: data.paymentMethodId,
          },
        },
      );

      return await this.model
        .findByIdAndUpdate(
          paymentMethodFromDb._id,
          {
            externalId: this.encryptionService.encryptData(
              data.paymentMethodId,
            ),
          },
          { new: true },
        )
        .exec();
    } catch (error) {
      throw new Error('Failed to create payment method with Payment provider');
    }
  }

  async remove(userId: string) {
    try {
      const paymentMethodFromDb = await this.findOneByUserId(userId);

      if (!paymentMethodFromDb) {
        throw new NotFoundException('Failed to find saved payment method');
      }

      await this.servicePaymentProvider.client.customers.update(
        paymentMethodFromDb?.externalCustomerId,
        {
          invoice_settings: {
            default_payment_method: undefined,
          },
        },
      );

      return await this.model
        .findByIdAndDelete(paymentMethodFromDb._id, { new: true })
        .exec();
    } catch (error) {
      throw new Error('Failed to create payment method with Payment provider');
    }
  }
}
