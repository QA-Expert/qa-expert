import type { AppProps } from 'next/app';
import HeadComponent from '../src/components/head/head';
import '../src/styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/';
import { dark } from '../src/theme/theme';
import { Toasts } from '../src/components/toasts/toast';
import { ApolloStateProps, useApollo } from '../apollo/client';

export default function MyApp({
  Component,
  pageProps,
}: AppProps<ApolloStateProps>) {
  const apolloClient = useApollo(pageProps);
  const theme = createTheme(dark);

  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={apolloClient}>
        <CssBaseline />
        <HeadComponent />
        <Toasts />
        <Component {...pageProps} />
      </ApolloProvider>
    </ThemeProvider>
  );
}
