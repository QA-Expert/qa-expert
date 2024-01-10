import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Address, AddressSchema } from './address.schema';
import { AddressService } from './address.service';
import { EncryptionModule } from 'src/modules/encryption/encryption.modules';
import { EncryptionService } from 'src/modules/encryption/encryption.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Address.name, schema: AddressSchema }]),
    EncryptionModule,
  ],
  providers: [AddressService, EncryptionService],
  exports: [AddressService],
})
export class AddressModule {}
