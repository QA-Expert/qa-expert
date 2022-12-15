/**
 *
 * @param token - string that is a encoded JWT https://jwt.io/introduction
 */
export const isTokenExpired = (token: string) =>
  Date.now() >=
  JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString()).exp * 1000;
