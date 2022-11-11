import type { AppProps } from 'next/app';
import HeadComponent from '../src/components/head/head';
import '../src/styles/globals.css';
import { InitialState, useApollo } from '../appolo/client';
import { ApolloProvider } from '@apollo/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/';
import theme from '../src/theme';
import { useRouter } from 'next/router';
import { GET_USER } from '../src/graphql/queries/queries';
import { useEffect } from 'react';
import { User } from 'graphql-schema-gen/schema.gen';
import { useAtom } from 'jotai';
import { userAtom } from '../src/store';

interface Props {
  initialApolloState: InitialState;
}

const PUBLIC_ROUTES = [
  '/login',
  '/register',
  '/reset-password/[token]',
  '/forgot-password',
];

export default function MyApp({ Component, pageProps }: AppProps<Props>) {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_user, setUser] = useAtom(userAtom);
  const apolloClient = useApollo(pageProps.initialApolloState);

  const shouldAuth = !PUBLIC_ROUTES.includes(router.pathname);

  useEffect(() => {
    if (shouldAuth) {
      apolloClient
        .query({ query: GET_USER })
        .then(({ data }: { data: { user: User | null } }) => {
          setUser(data?.user);
        })
        .catch(() => router.push('/login'));
    }
  }, [apolloClient, router, setUser, shouldAuth]);

  return (
    <ApolloProvider client={apolloClient}>
      <HeadComponent />
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
}
