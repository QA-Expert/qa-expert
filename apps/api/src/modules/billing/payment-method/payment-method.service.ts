import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaymentMethod } from './payment-method.schema';
import { EncryptionService } from 'src/modules/encryption/encryption.service';
import mongoose, { Model } from 'mongoose';
import { PaymentProviderService } from '../payment-provider/payment-provider.service';
import { PaymentMethodInput } from './payment-method.input';
import { UserBaseModel } from 'src/modules/users/user-base.model';

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
      throw new NotFoundException('Failed to find payment method');
    }

    const decryptedData: PaymentMethod = {
      ...encryptedData,
      externalCustomerId: decryptData(encryptedData.externalCustomerId),
      externalId: decryptData(encryptedData.externalId),
    } as PaymentMethod;

    return decryptedData;
  }

  async create(data: PaymentMethodInput, user: UserBaseModel) {
    const { decryptData } = this.encryptionService;

    try {
      const decodedString = decryptData(data.stringifiedObject);

      const decodedPaymentMethod = JSON.parse(decodedString);

      if (
        !decodedPaymentMethod.type ||
        !decodedPaymentMethod.billing_details ||
        !decodedPaymentMethod.card
      ) {
        throw new Error('Something is wrong with payment information');
      }

      // We create new customer with payment provider and attach payment method to customer by default so we can charge recouping subscription
      const customer =
        await this.servicePaymentProvider.client.customers.create({
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          invoice_settings: {
            default_payment_method: decodedPaymentMethod.id,
          },
        });

      const newPaymentMethod: Partial<PaymentMethod> = {
        user: new mongoose.Types.ObjectId(user._id),
        externalCustomerId: customer.id,
        externalId: decodedPaymentMethod.id,
        createdBy: new mongoose.Types.ObjectId(user._id),
        updatedBy: new mongoose.Types.ObjectId(user._id),
      };

      const model = new this.model(newPaymentMethod);

      if (!model) {
        throw new Error('Failed to create new payment method');
      }

      return await model.save();
    } catch (error) {
      throw new Error('Failed to create payment method with Payment provider');
    }
  }

  async update(data: PaymentMethodInput, user: UserBaseModel) {
    const { decryptData } = this.encryptionService;

    try {
      const decodedString = decryptData(data.stringifiedObject);

      const decodedPaymentMethod = JSON.parse(decodedString);

      if (
        !decodedPaymentMethod.type ||
        !decodedPaymentMethod.billing_details ||
        !decodedPaymentMethod.card
      ) {
        throw new Error('Something is wrong with payment information');
      }

      const paymentMethodFromDb = await this.findOneByUserId(user._id);

      await this.servicePaymentProvider.client.customers.update(
        paymentMethodFromDb?.externalCustomerId,
        {
          name: `${user.firstName} ${user.lastName}`,
          invoice_settings: {
            default_payment_method: decodedPaymentMethod.id,
          },
        },
      );

      return this.model.findByIdAndUpdate(
        paymentMethodFromDb._id,
        {
          externalId: decodedPaymentMethod.id,
        },
        { new: true },
      );
    } catch (error) {
      throw new Error('Failed to create payment method with Payment provider');
    }
  }
}
