import { Module } from '@nestjs/common';
import { PaymentProviderService } from './payment-provider.service';
import { PaymentProviderController } from './payment-provider.controller';
import { SubscriptionModule } from '../subscription/subscription.modules';

@Module({
  imports: [SubscriptionModule],
  providers: [PaymentProviderService],
  exports: [PaymentProviderService],
  controllers: [PaymentProviderController],
})
export class PaymentProviderModule {}
