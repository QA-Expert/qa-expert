import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import HeadComponent from '../src/components/head/head';
import '../src/styles/globals.css';
import { useApollo } from '../appolo/client';
import { ApolloProvider } from '@apollo/client';
import { AuthUserProvider } from '../src/context/auth';

export type NextPageWithLayout<Props> = NextPage<Props> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout<Props> = AppProps & {
  Component: NextPageWithLayout<Props>;
};

export default function MyApp({
  Component,
  // @ts-ignore
  pageProps,
}: AppPropsWithLayout<typeof pageProps>) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);
  return getLayout(
    <ApolloProvider client={apolloClient}>
      <AuthUserProvider>
        <HeadComponent />
        {/* @ts-ignore */}
        <Component {...pageProps} />
      </AuthUserProvider>
    </ApolloProvider>,
  );
}
