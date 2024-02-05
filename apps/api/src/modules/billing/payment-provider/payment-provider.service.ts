import { Injectable } from '@nestjs/common';
import { ConfigService } from 'src/modules/config/config.service';
import { Stripe } from 'stripe';

@Injectable()
export class PaymentProviderService {
  client: Stripe;

  constructor(private readonly serviceConfig: ConfigService) {
    this.client = new Stripe(this.serviceConfig.paymentProviderApiKey);
  }
}
