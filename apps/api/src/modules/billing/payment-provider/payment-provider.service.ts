import { HttpStatus, Injectable, RawBodyRequest } from '@nestjs/common';
import { ConfigService } from 'src/modules/config/config.service';
import { Stripe } from 'stripe';
import { Response, Request } from 'express';
import { SubscriptionService } from '../subscription/subscription.service';

@Injectable()
export class PaymentProviderService {
  client: Stripe;

  constructor(
    private readonly serviceConfig: ConfigService,
    private readonly serviceSubscription: SubscriptionService,
  ) {
    this.client = new Stripe(this.serviceConfig.paymentProviderApiKey);
  }

  async handleWebhookEvent(
    request: RawBodyRequest<Request>,
    response: Response,
  ) {
    const signature = request.headers['stripe-signature'];
    const endpointSecret = this.serviceConfig.paymentProviderWebhookSecret;

    let event: Stripe.Event;

    if (!signature) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send(`Webhook Error: Missing Signature`);
    }

    if (!request.rawBody) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send(`Webhook Error: Raw body is missing`);
    }

    try {
      event = this.client.webhooks.constructEvent(
        request.rawBody,
        signature,
        endpointSecret,
      );
    } catch (error) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send(`Webhook Error: ${(error as Error).message}`);
    }

    // @url https://stripe.com/docs/api/events/types
    // all event types
    switch (event.type) {
      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        const externalSubscriptionId = invoice.subscription;

        if (
          !externalSubscriptionId ||
          typeof externalSubscriptionId !== 'string'
        ) {
          return response
            .status(HttpStatus.BAD_REQUEST)
            .send(`Webhook Error: Invalid subscription id`);
        }

        await this.serviceSubscription.cancel(externalSubscriptionId);

        break;
      }
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object;
        const externalSubscriptionId = invoice.subscription;

        if (
          !externalSubscriptionId ||
          typeof externalSubscriptionId !== 'string'
        ) {
          return response
            .status(HttpStatus.BAD_REQUEST)
            .send(`Webhook Error: Invalid subscription id`);
        }

        await this.serviceSubscription.activate(externalSubscriptionId);

        break;
      }

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return response.send();
  }
}
