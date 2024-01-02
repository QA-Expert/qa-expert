import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/';
import theme from '../src/theme/theme';
import { Toasts } from '../src/components/toasts/toast';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { Metadata } from 'next';
import { ApolloWrapper } from './ApolloWrapper';
import { headers } from 'next/headers';
import { Provider as JotaiProvider } from 'jotai';

import './global.css';

/**
 * @url https://nextjs.org/docs/app/building-your-application/optimizing/metadata#static-metadata
 */
export const metadata: Metadata = {
  title: {
    template: '%s | QA Expert',
    default: 'QA Expert', // a default is required when creating a template
  },
  description: 'QA Expert platform. Learn new Role or improve your skills',
  keywords: ['Quality Assurance', 'QA Engineer', 'Courses'],
  authors: [
    { name: 'Andrei Surzhan', url: 'https://andrei-builds.software' },
    { name: 'Pavel Surzhan' },
  ],
  creator: 'Andrei Surzhan',
  applicationName: 'QA Expert',
  //@TODO: add openGraph data
  //@TODO: add robots data
  //@TODO: add manifest data
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  const token = headers().get('Cookie');

  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <JotaiProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <ApolloWrapper token={token}>
                <Toasts />
                {children}
              </ApolloWrapper>
            </ThemeProvider>
          </JotaiProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
