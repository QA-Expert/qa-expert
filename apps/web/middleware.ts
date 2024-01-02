import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isAuthTokenValid } from './utils/auth';
import { ACCESS_TOKEN_KEY, PUBLIC_ROUTES } from './src/constants/constants';
import { isAuthenticated } from './apollo/store';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const publicPathnames = PUBLIC_ROUTES.map((route) => route.split('/')[1]);
  const path = pathname.split('/')[1];
  const accessToken = request.headers.get('cookie');
  const authTokenInvalid = !accessToken || !isAuthTokenValid(accessToken);
  const response = NextResponse.next();

  isAuthenticated(!authTokenInvalid);

  if (authTokenInvalid) {
    response.cookies.delete(ACCESS_TOKEN_KEY);
  }

  if (!publicPathnames.includes(path)) {
    if (authTokenInvalid) {
      console.error('JWT is missing in Next Server Side Headers or expired');

      return NextResponse.redirect(new URL('/courses', request.url));
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
