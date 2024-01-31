import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Subscription, SubscriptionSchema } from './subscription.schema';
import { SubscriptionService } from './subscription.service';
import { SubscriptionResolver } from './subscription.resolver';
import { PaymentProviderModule } from '../payment-provider/payment-provider.modules';
import { PaymentMethodModule } from '../payment-method/payment-method.modules';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Subscription.name, schema: SubscriptionSchema },
    ]),
    PaymentProviderModule,
    PaymentMethodModule,
  ],
  providers: [SubscriptionService, SubscriptionResolver, JwtService],
  exports: [SubscriptionService],
})
export class SubscriptionModule {}
