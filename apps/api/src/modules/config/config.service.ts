import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { Config } from './config.schema';

@Injectable()
export class ConfigService {
  constructor(private configService: NestConfigService<Config, true>) {}

  get appName(): string {
    return this.configService.get<string>('APP_NAME');
  }

  get port(): number {
    return this.configService.get<number>('PORT');
  }

  get clientBaseUrl(): string {
    return this.configService.get<string>('CLIENT_BASE_URL');
  }

  get dbUri(): string {
    return this.configService.get<string>('DATABASE_URI');
  }

  get authSecret(): string {
    return this.configService.get<string>('AUTH_SECRET');
  }

  get authTokenExpiresIn(): string {
    return this.configService.get<string>('AUTH_TOKEN_EXPIRES_IN');
  }

  get authSalt(): number {
    return this.configService.get<number>('AUTH_SALT');
  }

  get authForgotPasswordTokenExpiresIn(): number {
    return this.configService.get<number>(
      'AUTH_FORGOT_PASSWORD_TOKEN_EXPIRES_IN',
    );
  }

  get emailServiceUrl(): string {
    return this.configService.get<string>('EMAIL_SERVICE');
  }

  get emailServiceUsername(): string {
    return this.configService.get<string>('EMAIL_USERNAME');
  }

  get emailServicePassword(): string {
    return this.configService.get<string>('EMAIL_PASSWORD');
  }

  get emailFrom(): string {
    return this.configService.get<string>('EMAIL_FROM');
  }

  get emailServicePort(): string {
    return this.configService.get<string>('EMAIL_PORT');
  }

  get courseCooldownDays(): number {
    return this.configService.get<number>('COURSE_COOLDOWN');
  }

  get encryptionMethod(): string {
    return this.configService.get<string>('ENCRYPTION_METHOD');
  }

  get encryptionSecretKey(): string {
    return this.configService.get<string>('ENCRYPTION_SECRET_KEY');
  }

  get encryptionIv(): string {
    return this.configService.get<string>('ENCRYPTION_IV');
  }

  get authGoogleClientId(): string {
    return this.configService.get<string>('AUTH_GOOGLE_CLIENT_ID');
  }

  get authGoogleClientSecret(): string {
    return this.configService.get<string>('AUTH_GOOGLE_CLIENT_SECRET');
  }

  get paymentProviderApiKey(): string {
    return this.configService.get<string>('PAYMENT_PROVIDER_API_KEY');
  }

  get paymentProviderWebhookSecret(): string {
    return this.configService.get<string>('PAYMENT_PROVIDER_WEBHOOK_SECRET');
  }
}
