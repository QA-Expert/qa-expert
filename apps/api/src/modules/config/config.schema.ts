import Joi from 'joi';

export interface Config {
  APP_NAME: string;
  HOST: string;
  PORT: number;
  DATABASE_URI: string;
  AUTH_SECRET: string;
  AUTH_TOKEN_EXPIRES_IN: string;
  AUTH_SALT: number;
  AUTH_FORGOT_PASSWORD_TOKEN_EXPIRES_IN: number;
  EMAIL_SERVICE: string;
  EMAIL_USERNAME: string;
  EMAIL_PASSWORD: string;
  EMAIL_FROM: string;
  COURSE_COOLDOWN: number;
  BILLING_ENCRYPTION_METHOD: string;
  BILLING_SECRET_KEY: string;
  AUTH_GOOGLE_CLIENT_ID: string;
  AUTH_GOOGLE_CLIENT_SECRET: string;
  AUTH_FACEBOOK_APP_ID: string;
  AUTH_FACEBOOK_CLIENT_SECRET: string;
}

export const validationSchema = Joi.object<Config>({
  APP_NAME: Joi.string().default('QA Expert'),
  PORT: Joi.number().default(3001),
  HOST: Joi.string().default('localhost'),
  DATABASE_URI: Joi.string().default('mongodb//localhost:27017/qaexpert'),
  AUTH_SECRET: Joi.string().required(),
  AUTH_TOKEN_EXPIRES_IN: Joi.string().default('1h'),
  AUTH_SALT: Joi.number().default(10),
  AUTH_FORGOT_PASSWORD_TOKEN_EXPIRES_IN: Joi.number().default(24),
  EMAIL_SERVICE: Joi.string().required(),
  EMAIL_USERNAME: Joi.string().required(),
  EMAIL_PASSWORD: Joi.string().required(),
  EMAIL_FROM: Joi.string().required(),
  COURSE_COOLDOWN: Joi.number().required(),
  BILLING_ENCRYPTION_METHOD: Joi.string().default('aes-256-cbc'),
  BILLING_SECRET_KEY: Joi.string(),
  AUTH_GOOGLE_CLIENT_ID: Joi.string(),
  AUTH_GOOGLE_CLIENT_SECRET: Joi.string(),
});
