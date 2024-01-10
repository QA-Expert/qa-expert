import { Module } from '@nestjs/common';
import { UserModule } from '../../users/user.module';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { CreditCard, CreditCardSchema } from './credit-card.schema';
import { CreditCardService } from './credit-card.service';
import { CreditCardResolver } from './credit-card.resolver';
import { AddressModule } from '../address/address.modules';
import { EncryptionModule } from 'src/modules/encryption/encryption.modules';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CreditCard.name, schema: CreditCardSchema },
    ]),
    UserModule,
    AddressModule,
    EncryptionModule,
  ],
  providers: [CreditCardService, CreditCardResolver, JwtService],
  exports: [CreditCardService],
})
export class CreditCardModule {}
