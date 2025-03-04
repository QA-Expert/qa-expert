import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isAuthTokenValid } from './src/utils/auth';
import { ACCESS_TOKEN_KEY, PUBLIC_ROUTES } from './src/constants/constants';
import { isAuthenticated } from './src/apollo/store';
import { parse } from 'cookie';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const { pathname } = request.nextUrl;
  const publicPathnames = PUBLIC_ROUTES.map((route) => route.split('/')[1]);
  const path = pathname.split('/')[1];
  const cookie = request.headers.get('cookie');
  const parsedCookie = parse(cookie ?? '');
  const accessToken = parsedCookie[ACCESS_TOKEN_KEY];
  const authTokenInvalid = !accessToken || !isAuthTokenValid(accessToken);

  //NOTE: that is pretty much useless for client side as it is scoped only on server
  isAuthenticated(!authTokenInvalid);

  if (authTokenInvalid) {
    response.cookies.delete(ACCESS_TOKEN_KEY);
  }

  if (!publicPathnames.includes(path)) {
    if (authTokenInvalid) {
      console.error('JWT is missing in Next Server Side Headers or expired');
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|favicon.ico).*)',
  ],
};
