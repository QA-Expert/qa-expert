import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isAuthTokenValid } from './utils/auth';
import { ACCESS_TOKEN_KEY, PUBLIC_ROUTES } from './src/constants/constants';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const publicPathnames = PUBLIC_ROUTES.map((route) => route.split('/')[1]);
  const path = pathname.split('/')[1];
  const accessToken = request.headers.get('cookie');
  const authTokenInvalid = !accessToken || !isAuthTokenValid(accessToken);
  const response = NextResponse.next();

  if (authTokenInvalid) {
    // TODO: for some reason Nextjs does not won't to delete cookies without calling set first
    // https://github.com/vercel/next.js/issues/40146
    response.cookies.set(ACCESS_TOKEN_KEY, '');
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
