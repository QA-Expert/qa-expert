import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaymentMethod } from './payment-method.schema';
import { EncryptionService } from 'src/modules/encryption/encryption.service';
import mongoose, { Model } from 'mongoose';
import { PaymentProviderService } from '../payment-provider/payment-provider.service';
import { PaymentMethodInput } from './payment-method.input';
import { User } from 'src/modules/users/user.schema';
import { PaymentMethodOutput } from './payment-method.output';

@Injectable()
export class PaymentMethodService {
  constructor(
    @InjectModel(PaymentMethod.name)
    private model: Model<PaymentMethod>,
    private readonly encryptionService: EncryptionService,
    private readonly servicePaymentProvider: PaymentProviderService,
  ) {}

  async findOneByUserId(userId: string) {
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
      _id: encryptedData._id,
      user: encryptedData.user._id,
      externalCustomerId: this.encryptionService.decryptData(
        encryptedData.externalCustomerId,
      ),
      externalId: this.encryptionService.decryptData(encryptedData.externalId),
    } as PaymentMethod;

    return decryptedData;
  }

  async retrieve(userId: string) {
    try {
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

      const billingAddress = paymentMethod.billing_details.address;
      const address = billingAddress
        ? `${billingAddress?.line1 ? billingAddress?.line1 + ', ' : ''}
      ${billingAddress?.line2 ? billingAddress?.line2 + ', ' : ''}
      ${billingAddress?.city ? billingAddress?.city + ', ' : ''}
      ${billingAddress?.country ? billingAddress?.country + ', ' : ''}
      ${billingAddress?.state ? billingAddress?.state + ', ' : ''}
      ${billingAddress?.postal_code ?? ''}
      `
        : '--';

      const result: PaymentMethodOutput = {
        cardBrand: paymentMethod.card.brand,
        cardLast4: paymentMethod.card.last4,
        type: paymentMethod.type,
        address,
      };

      return result;
    } catch (error) {
      // @ts-expect-error cannot import Stripe error
      if ('statusCode' in error && error.statusCode === 404) {
        return null;
      }
    }
  }

  /**
   *
   * 1. We check if customer exists on Payment Provider side
   * 2. If exists we update customer's payment method
   * 3. If does not exist we create new customer with give payment method
   * 4. Finally we upsert PaymentMethod document in our DB
   */
  async createOrUpdate(data: PaymentMethodInput, user: User) {
    try {
      let externalCustomerId: string;

      const customerSearchResult =
        await this.servicePaymentProvider.client.customers.search({
          query: `email:'${user.email}'`,
        });

      const isCustomerExist =
        Array.isArray(customerSearchResult.data) &&
        customerSearchResult.data.length === 1 &&
        customerSearchResult.data[0].id;

      if (!isCustomerExist) {
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

        externalCustomerId = customer.id;
      } else {
        // If customer exists 1-attach new payment method 2-update their default payment method to new one
        externalCustomerId = customerSearchResult.data[0].id;

        await this.servicePaymentProvider.client.paymentMethods.attach(
          data.paymentMethodId,
          { customer: externalCustomerId },
        );

        await this.servicePaymentProvider.client.customers.update(
          externalCustomerId,
          {
            name: `${user.firstName} ${user.lastName}`,

            invoice_settings: {
              default_payment_method: data.paymentMethodId,
            },
          },
        );
      }

      // upsert document
      return await this.model
        .findOneAndUpdate(
          {
            user: {
              _id: user._id,
            },
          },
          {
            user: new mongoose.Types.ObjectId(user._id),
            externalCustomerId:
              this.encryptionService.encryptData(externalCustomerId),
            externalId: this.encryptionService.encryptData(
              data.paymentMethodId,
            ),
            createdBy: new mongoose.Types.ObjectId(user._id),
            updatedBy: new mongoose.Types.ObjectId(user._id),
          },
          { new: true, upsert: true },
        )
        .exec();
    } catch (error) {
      throw new Error(
        'Failed to create or update payment method with Payment provider',
      );
    }
  }
  async remove(userId: string) {
    try {
      const paymentMethodFromDb = await this.findOneByUserId(userId);

      if (!paymentMethodFromDb) {
        throw new NotFoundException('Failed to find saved payment method');
      }

      await this.servicePaymentProvider.client.paymentMethods.detach(
        paymentMethodFromDb.externalId,
      );

      await this.servicePaymentProvider.client.customers.update(
        paymentMethodFromDb.externalCustomerId,
        {
          invoice_settings: {
            default_payment_method: undefined,
          },
        },
      );

      const result = await this.model
        .findByIdAndDelete(paymentMethodFromDb._id)
        .exec();

      if (result === null) {
        throw new Error('Failed to remove payment method from DB');
      }

      return result;
    } catch (error) {
      throw new Error('Failed to remove payment method');
    }
  }
}
