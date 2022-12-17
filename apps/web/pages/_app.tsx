import type { AppProps } from 'next/app';
import HeadComponent from '../src/components/head/head';
import '../src/styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/';
import theme from '../src/theme/theme';
import { Toasts } from '../src/components/toasts/toast';
import { ApolloStateProps, useApollo } from '../apollo/client';

export default function MyApp({
  Component,
  pageProps,
}: AppProps<ApolloStateProps>) {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <HeadComponent />
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Toasts />
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
}
