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

  get host(): string {
    return this.configService.get<string>('HOST');
  }

  get dbHost(): string {
    return this.configService.get<string>('DATABASE_HOST');
  }

  get dbPort(): number {
    return this.configService.get<number>('DATABASE_PORT');
  }

  get dbUsername(): string {
    return this.configService.get<string>('DATABASE_USERNAME');
  }

  get dbPassword(): string {
    return this.configService.get<string>('DATABASE_PASSWORD');
  }

  get dbName(): string {
    return this.configService.get<string>(`DATABASE_NAME`);
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

  get courseCooldownDays(): number {
    return this.configService.get<number>('NEXT_PUBLIC_COURSE_COOLDOWN');
  }
}
