import type { AppProps } from 'next/app';
import HeadComponent from '../src/components/head/head';
import '../src/styles/globals.css';
import { InitialState, useApollo } from '../appolo/client';
import { ApolloProvider } from '@apollo/client';
import { UserProvider } from '../src/context/user';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/';
import theme from '../src/theme';
import { useRouter } from 'next/router';
import { GET_USER } from '../src/graphql/queries/queries';
import { useEffect, useState } from 'react';
import { User } from 'graphql-schema-gen/schema.gen';

interface Props {
  initialApolloState: InitialState;
}

const PUBLIC_ROUTES = ['/login', '/register', '/reset-password/[token]'];

export default function MyApp({ Component, pageProps }: AppProps<Props>) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const apolloClient = useApollo(pageProps.initialApolloState);
  console.log(router.pathname);
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
  }, [apolloClient, router, shouldAuth]);

  return (
    <ApolloProvider client={apolloClient}>
      <UserProvider user={user}>
        <HeadComponent />
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </UserProvider>
    </ApolloProvider>
  );
}
