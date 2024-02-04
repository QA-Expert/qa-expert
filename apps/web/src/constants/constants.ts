export const ACCESS_TOKEN_KEY = 'qaexpert_io_access_token';

/** Routes that don't require auth */
export const PUBLIC_ROUTES = [
  '/',
  '/images',
  '/courses',
  '/login',
  '/register',
  '/reset-password/[token]',
  '/forgot-password',
  '/reset-password',
];

export const BASE_URL = 'https://qaexpert-7g2rd.ondigitalocean.app';

export const AUTH_REDIRECT_URI = global?.window?.location.href;
