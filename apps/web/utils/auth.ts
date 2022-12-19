/**
 *
 * @param token - string that is a encoded JWT https://jwt.io/introduction
 */
export const isTokenExpired = (token: string) =>
  // TODO: Solve - A Node.js API is used (Buffer at line: 4) which is not supported in the Edge Runtime.
  Date.now() >=
  JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString()).exp * 1000;
