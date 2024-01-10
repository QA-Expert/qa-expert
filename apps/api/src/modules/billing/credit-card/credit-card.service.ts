import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreditCard } from './credit-card.schema';
import { EncryptionService } from 'src/modules/encryption/encryption.service';
import { AddressService } from '../address/address.service';

@Injectable()
export class CreditCardService {
  constructor(
    @InjectModel(CreditCard.name)
    private model: Model<CreditCard>,
    private encryptionService: EncryptionService,
    private addressService: AddressService,
  ) {}

  async findOne(userId: string) {
    const { decryptData } = this.encryptionService;
    const encryptedData = await this.model
      .findOne({
        user: {
          _id: userId,
        },
      })
      .populate({ path: 'user', select: 'email' })
      .exec();

    if (!encryptedData) {
      return encryptedData;
    }

    const decryptedData: CreditCard = {
      ...encryptedData,
      cardToken: decryptData(encryptedData.cardToken),
      lastFour: decryptData(encryptedData.lastFour),
      cardType: decryptData(encryptedData.cardType),
      expiryMonth: decryptData(encryptedData.expiryMonth),
      expiryYear: decryptData(encryptedData.expiryYear),
    } as CreditCard;

    return decryptedData;
  }

  async findAddress(creditCard: CreditCard) {
    return await this.addressService.findOneByCreditCardId(creditCard._id);
  }
}
