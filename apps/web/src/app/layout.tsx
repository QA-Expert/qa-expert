import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/';
import theme from 'theme/theme';
import { Toasts } from '@/components/toasts/toast';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { Metadata } from 'next';
import { ApolloWrapper } from './ApolloWrapper';
import { headers } from 'next/headers';

import './global.css';
import { Suspense } from 'react';
import { AuthGuard } from './AuthGuard';
import { parse } from 'cookie';
import { ACCESS_TOKEN_KEY } from 'constants/constants';

/**
 * @url https://nextjs.org/docs/app/building-your-application/optimizing/metadata#static-metadata
 */
export const metadata: Metadata = {
  metadataBase: new URL('https://qaexpert-7g2rd.ondigitalocean.app'),
  title: {
    template: '%s | QA Expert',
    default: 'QA Expert', // a default is required when creating a template
  },
  description: 'QA Expert platform. Learn new Role or improve your skills',
  keywords: [
    'Quality Assurance',
    'QA Engineer',
    'Courses',
    'IT',
    'Software Testing',
    'QA',
    'testing',
  ],
  authors: [{ name: 'Andrei Surzhan', url: 'https://andrei-builds.software' }],
  creator: 'Andrei Surzhan',
  applicationName: 'QA Expert',
  manifest: '/manifest.json',
  openGraph: {
    title: 'QA Expert',
    description: 'QA Expert platform. Learn new Role or improve your skills',
    images: [
      {
        url: '/icon-512x512.png',
      },
    ],
    type: 'website',
    url: 'https://qaexpert-7g2rd.ondigitalocean.app',
    siteName: 'QA Expert',
  },
  robots: 'index',
};

export default function RootLayout({
  children,
  login,
}: {
  children: React.ReactNode;
  login: React.ReactNode;
}) {
  const cookie = headers().get('Cookie');
  const parsedCookie = parse(cookie ?? '');
  const token = parsedCookie[ACCESS_TOKEN_KEY];

  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <ApolloWrapper token={token}>
              <AuthGuard>
                <Toasts />
                <Suspense fallback={'...Loading'}>{children}</Suspense>
                {login}
              </AuthGuard>
            </ApolloWrapper>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
