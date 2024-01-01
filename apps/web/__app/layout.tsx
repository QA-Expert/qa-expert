import type { AppProps } from 'next/app';
import '../src/styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/';
import { dark } from '../src/theme/theme';
import { Toasts } from '../src/components/toasts/toast';
import { ApolloStateProps, useApollo } from '../apollo/client';
import createTheme from '@mui/material/styles/createTheme';

import { Metadata } from 'next';

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
  const apolloClient = useApollo(props);
  const theme = createTheme(dark);

  return (
    <html lang="en">
      <ThemeProvider theme={theme}>
        <ApolloProvider client={apolloClient}>
          <CssBaseline />
          <Toasts />
          <body>{children}</body>
        </ApolloProvider>
      </ThemeProvider>
    </html>
  );
}
