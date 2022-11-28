import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiConfigService {
  constructor(
    private configService: ConfigService<
      {
        PORT: number;
        DATABASE_HOST: string;
        DATABASE_PORT: number;
        DATABASE_NAME: string;
        AUTH_SECRET: string;
        AUTH_TOKEN_EXPIRES_IN: string;
        AUTH_SALT: number;
        AUTH_FORGOT_PASSWORD_TOKEN_EXPIRES_IN: number;
        EMAIL_SERVICE: string;
        EMAIL_USERNAME: string;
        EMAIL_PASSWORD: string;
        EMAIL_FROM: string;
      },
      true
    >,
  ) {}

  get port(): number {
    return this.configService.get<number>('PORT');
  }

  get dbHost(): string {
    return this.configService.get<string>('DATABASE_HOST');
  }

  get dbPort(): number {
    return this.configService.get<number>('DATABASE_PORT');
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
}
