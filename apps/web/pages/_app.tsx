import type { AppProps } from 'next/app';
import HeadComponent from '../src/components/head/head';
import '../src/styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import CssBaseline from '@mui/material/CssBaseline';
import { Button, ThemeProvider } from '@mui/material/';
import { light, dark } from '../src/theme/theme';
import { Toasts } from '../src/components/toasts/toast';
import { ApolloStateProps, useApollo } from '../apollo/client';
import { useState } from 'react';
import createTheme from '@mui/material/styles/createTheme';

export default function MyApp({
  Component,
  pageProps,
}: AppProps<ApolloStateProps>) {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const apolloClient = useApollo(pageProps);
  const theme = createTheme(isDarkTheme ? dark : light);

  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={apolloClient}>
        <CssBaseline />
        <HeadComponent />
        <Toasts />
        <Button
          onClick={() => {
            setIsDarkTheme(!isDarkTheme);
          }}
        >
          {isDarkTheme ? 'Dark' : 'Light'}
        </Button>
        <Component
          onThemeChange={() => setIsDarkTheme(!isDarkTheme)}
          {...pageProps}
        />
      </ApolloProvider>
    </ThemeProvider>
  );
}
