import { Module } from '@nestjs/common';
import { PaymentProviderService } from './payment-provider.service';
import { EncryptionService } from 'src/modules/encryption/encryption.service';

@Module({
  imports: [],
  providers: [PaymentProviderService, EncryptionService],
  exports: [PaymentProviderService],
})
export class PaymentProviderModule {}
