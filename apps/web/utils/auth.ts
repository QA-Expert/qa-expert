import { GetServerSidePropsContext } from 'next';

/**
 *
 * @param token - string that is a encoded JWT https://jwt.io/introduction
 */
export const isTokenExpired = (token: string) =>
  Date.now() >= JSON.parse(atob(token.split('.')[1]).toString()).exp * 1000;

export const isUserLoggedIn = (ctx: GetServerSidePropsContext) =>
  Boolean(ctx?.req.headers.cookie);
