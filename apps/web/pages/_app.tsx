import type { AppProps } from 'next/app';
import HeadComponent from '../src/components/head/head';
import '../src/styles/globals.css';
import { InitialState, useApollo } from '../appolo/client';
import { ApolloProvider } from '@apollo/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/';
import theme from '../src/theme/theme';
import { Toasts } from '../src/components/toasts/toast';

interface Props {
  initialApolloState: InitialState;
}

export default function MyApp({ Component, pageProps }: AppProps<Props>) {
  const apolloClient = useApollo(pageProps.initialApolloState);

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
