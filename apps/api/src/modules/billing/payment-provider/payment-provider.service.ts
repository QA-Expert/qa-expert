import { HttpStatus, Injectable, Logger, RawBodyRequest } from '@nestjs/common';
import { ConfigService } from 'src/modules/config/config.service';
import { Stripe } from 'stripe';
import { Response, Request } from 'express';
import { SubscriptionService } from '../subscription/subscription.service';
import { SubscriptionStatus } from '../subscription/subscription.schema';

@Injectable()
export class PaymentProviderService {
  client: Stripe;
  private readonly logger = new Logger(PaymentProviderService.name);

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
    let event: Stripe.Event;

    try {
      const signature = request.headers['stripe-signature'];
      const endpointSecret = this.serviceConfig.paymentProviderWebhookSecret;

      if (!signature) {
        throw new Error('Missing Signature');
      }

      if (!request.rawBody) {
        throw new Error('Raw body is missing');
      }

      event = this.client.webhooks.constructEvent(
        request.rawBody,
        signature,
        endpointSecret,
      );

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
            throw new Error('Invalid subscription id');
          }

          const subscriptionFromDb =
            await this.serviceSubscription.findOneByExternalId(
              externalSubscriptionId,
            );

          if (
            subscriptionFromDb &&
            subscriptionFromDb.status !== SubscriptionStatus.CANCELED
          ) {
            await this.serviceSubscription.cancel(
              externalSubscriptionId,
              'Canceled due to payment failure',
            );
          }

          break;
        }
        default:
          this.logger.warn(`Unhandled event type ${event.type}`);
      }

      return response.send();
    } catch (error) {
      this.logger.error((error as Error).message);

      return response
        .status(HttpStatus.BAD_REQUEST)
        .send(`Webhook Error: ${(error as Error).message}`);
    }
  }
}
