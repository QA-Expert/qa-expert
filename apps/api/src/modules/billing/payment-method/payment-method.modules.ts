import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentMethod, PaymentMethodSchema } from './payment-method.schema';
import { PaymentMethodService } from './payment-method.service';
import { EncryptionModule } from 'src/modules/encryption/encryption.modules';
import { EncryptionService } from 'src/modules/encryption/encryption.service';
import { PaymentProviderModule } from '../payment-provider/payment-provider.modules';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PaymentMethod.name, schema: PaymentMethodSchema },
    ]),
    EncryptionModule,
    PaymentProviderModule,
  ],
  providers: [PaymentMethodService, EncryptionService],
  exports: [PaymentMethodService],
})
export class PaymentMethodModule {}
