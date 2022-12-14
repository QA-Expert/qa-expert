import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isTokenExpired } from './utils/auth';
import { PUBLIC_ROUTES } from './src/constants/constants';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const publicPathnames = PUBLIC_ROUTES.map((route) => route.split('/')[1]);
  const path = pathname.split('/')[1];

  if (!publicPathnames.includes(path)) {
    const accessToken = request.headers.get('cookie');
    const shouldRedirectToLoginPage = accessToken
      ? isTokenExpired(accessToken)
      : true;

    if (shouldRedirectToLoginPage) {
      console.error('JWT is missing in Next Server Side Headers or expired');

      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
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
