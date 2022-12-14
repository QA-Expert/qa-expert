export const ACCESS_TOKEN_KEY = 'access_token';

/** Routes that don't require auth */
export const PUBLIC_ROUTES = [
  '/login',
  '/register',
  '/reset-password/[token]',
  '/forgot-password',
];
