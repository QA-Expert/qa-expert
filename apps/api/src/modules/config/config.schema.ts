export interface Config {
  APP_NAME: string;
  HOST: string;
  PORT: number;
  DATABASE_HOST: string;
  DATABASE_PORT: number;
  DATABASE_NAME: string;
  DATABASE_USERNAME: string;
  DATABASE_PASSWORD: string;
  AUTH_SECRET: string;
  AUTH_TOKEN_EXPIRES_IN: string;
  AUTH_SALT: number;
  AUTH_FORGOT_PASSWORD_TOKEN_EXPIRES_IN: number;
  EMAIL_SERVICE: string;
  EMAIL_USERNAME: string;
  EMAIL_PASSWORD: string;
  EMAIL_FROM: string;
  NEXT_PUBLIC_COURSE_COOLDOWN: number;
}
