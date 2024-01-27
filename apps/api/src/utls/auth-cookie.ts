import { serialize, parse } from 'cookie';
import { ServerResponse } from 'http';
import { RequestWithUser } from 'src/modules/auth/helpers';

export const TOKEN_NAME = 'qaexpert_io_access_token';

export const MAX_AGE = 60 * 60 * 8; // 8 hours

export function setTokenCookie(res: ServerResponse, token: string) {
  const cookie = serialize(TOKEN_NAME, token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
  });

  res.setHeader('Set-Cookie', cookie);
}

export function removeTokenCookie(res: ServerResponse) {
  const cookie = serialize(TOKEN_NAME, '', {
    maxAge: -1,
    path: '/',
  });

  res.setHeader('Set-Cookie', cookie);
}

export function parseCookies(req: RequestWithUser) {
  const cookie = req.headers?.cookie;

  return parse(cookie ?? '');
}

export function getTokenCookie(req: RequestWithUser) {
  const cookies = parseCookies(req);

  return cookies[TOKEN_NAME];
}
