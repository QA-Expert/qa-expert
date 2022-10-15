import type { AppProps } from 'next/app';
import HeadComponent from '../src/components/head/head';
import '../src/styles/globals.css';
import { InitialState, useApollo } from '../appolo/client';
import { ApolloProvider } from '@apollo/client';
import { AuthUserProvider } from '../src/context/auth';

interface Props {
  initialApolloState: InitialState;
}

export default function MyApp({ Component, pageProps }: AppProps<Props>) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <AuthUserProvider>
        <HeadComponent />
        <Component {...pageProps} />
      </AuthUserProvider>
    </ApolloProvider>
  );
}
