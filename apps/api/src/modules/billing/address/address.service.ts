import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Address } from './address.schema';
import { EncryptionService } from 'src/modules/encryption/encryption.service';
import { Model } from 'mongoose';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address.name)
    private model: Model<Address>,
    private encryptionService: EncryptionService,
  ) {}

  async findOneByCreditCardId(creditCardId: string) {
    const { decryptData } = this.encryptionService;
    const encryptedData = await this.model
      .findOne({
        creditCard: {
          _id: creditCardId,
        },
      })
      .exec();

    if (!encryptedData) {
      return encryptedData;
    }

    const decryptedData: Address = {
      ...encryptedData,
      phoneNumber: decryptData(encryptedData.phoneNumber),
      streetLine1: decryptData(encryptedData.streetLine1),
      streetLine2: decryptData(encryptedData.streetLine2),
      city: decryptData(encryptedData.city),
      state: decryptData(encryptedData.state),
      country: decryptData(encryptedData.country),
      zip: decryptData(encryptedData.zip),
    } as Address;

    return decryptedData;
  }
}
