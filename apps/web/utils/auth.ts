/**
 *
 * @param token - string that is a encoded JWT https://jwt.io/introduction
 */
export const isAuthTokenValid = (token: string) =>
  Date.now() < JSON.parse(atob(token.split('.')[1]).toString()).exp * 1000;
