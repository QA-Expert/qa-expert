import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentMethod, PaymentMethodSchema } from './payment-method.schema';
import { PaymentMethodService } from './payment-method.service';
import { EncryptionModule } from 'src/modules/encryption/encryption.modules';
import { PaymentProviderModule } from '../payment-provider/payment-provider.modules';
import { PaymentMethodResolver } from './payment-method.resolver';
import { UserModule } from 'src/modules/users/user.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PaymentMethod.name, schema: PaymentMethodSchema },
    ]),
    EncryptionModule,
    UserModule,
    PaymentProviderModule,
  ],
  providers: [PaymentMethodService, PaymentMethodResolver, JwtService],
  exports: [PaymentMethodService],
})
export class PaymentMethodModule {}
