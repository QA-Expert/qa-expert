import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './modules/config/config.service';

async function bootstrap() {
  // @url https://docs.nestjs.com/faq/raw-body
  // @url https://stripe.com/docs/webhooks#verify-official-libraries
  // we need to introduce raw body to be able to use it for payment provider webhook signature validation
  const app = await NestFactory.create(AppModule, { rawBody: true });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(app.get(ConfigService).port);
}

bootstrap();
