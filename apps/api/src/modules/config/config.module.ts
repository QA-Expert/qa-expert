import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { ConfigService } from './config.service';
import { Config } from './config.schema';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development.local'],
      validationSchema: Joi.object<Config>({
        APP_NAME: Joi.string().default('QA Expert'),
        PORT: Joi.number().default(3001),
        HOST: Joi.string().default('localhost'),
        DATABASE_HOST: Joi.string().default('localhost'),
        DATABASE_PORT: Joi.number().default(27017),
        DATABASE_NAME: Joi.string().default('qa-expert'),
        DATABASE_USERNAME: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        AUTH_SECRET: Joi.string().required(),
        AUTH_TOKEN_EXPIRES_IN: Joi.string().default('1h'),
        AUTH_SALT: Joi.number().default(10),
        AUTH_FORGOT_PASSWORD_TOKEN_EXPIRES_IN: Joi.number().default(24),
        EMAIL_SERVICE: Joi.string().required(),
        EMAIL_USERNAME: Joi.string().required(),
        EMAIL_PASSWORD: Joi.string().required(),
        EMAIL_FROM: Joi.string().required(),
      }),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
