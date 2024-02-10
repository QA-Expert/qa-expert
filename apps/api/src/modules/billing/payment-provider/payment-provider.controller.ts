import { Controller, Post, RawBodyRequest, Req, Res } from '@nestjs/common';
import { PaymentProviderService } from './payment-provider.service';
import { Response, Request } from 'express';

@Controller('webhooks')
export class PaymentProviderController {
  constructor(private readonly service: PaymentProviderService) {}

  @Post()
  // @url https://docs.nestjs.com/faq/raw-body
  // @url https://stripe.com/docs/webhooks#verify-official-libraries
  // we need to introduce raw body to be able to use it for payment provider webhook signature validation
  handleEvent(@Req() req: RawBodyRequest<Request>, @Res() res: Response) {
    this.service.handleWebhookEvent(req, res);
  }
}
