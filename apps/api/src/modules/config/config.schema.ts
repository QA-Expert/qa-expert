import Joi from 'joi';

export interface Config {
  APP_NAME: string;
  CLIENT_BASE_URL: string;
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
  EMAIL_PORT: number;
  COURSE_COOLDOWN: number;
  ENCRYPTION_METHOD: string;
  ENCRYPTION_SECRET_KEY: string;
  ENCRYPTION_IV: string;
  AUTH_GOOGLE_CLIENT_ID: string;
  AUTH_GOOGLE_CLIENT_SECRET: string;
  PAYMENT_PROVIDER_API_KEY: string;
  PAYMENT_PROVIDER_WEBHOOK_SECRET: string;
}

export const validationSchema = Joi.object<Config>({
  APP_NAME: Joi.string().default('QA Expert'),
  PORT: Joi.number().default(3001).required(),
  CLIENT_BASE_URL: Joi.string().default('http://localhost:3000').required(),
  DATABASE_URI: Joi.string()
    .default('mongodb//localhost:27017/qaexpert')
    .required(),
  AUTH_SECRET: Joi.string().required(),
  AUTH_TOKEN_EXPIRES_IN: Joi.string().default('1h').required(),
  AUTH_SALT: Joi.number().default(10).required(),
  AUTH_FORGOT_PASSWORD_TOKEN_EXPIRES_IN: Joi.number().default(24),
  EMAIL_SERVICE: Joi.string().required(),
  EMAIL_USERNAME: Joi.string().required(),
  EMAIL_PASSWORD: Joi.string().required(),
  EMAIL_FROM: Joi.string().required(),
  EMAIL_PORT: Joi.number().required(),
  COURSE_COOLDOWN: Joi.number().required(),
  ENCRYPTION_METHOD: Joi.string().required().default('aes-256-cbc'),
  ENCRYPTION_SECRET_KEY: Joi.string().required(),
  ENCRYPTION_IV: Joi.string().required(),
  AUTH_GOOGLE_CLIENT_ID: Joi.string().required(),
  AUTH_GOOGLE_CLIENT_SECRET: Joi.string().required(),
  PAYMENT_PROVIDER_API_KEY: Joi.string().required(),
  PAYMENT_PROVIDER_WEBHOOK_SECRET: Joi.string().required(),
});
