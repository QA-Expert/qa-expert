import type { AppProps } from 'next/app';
import HeadComponent from '../src/components/head/head';
import '../src/styles/globals.css';
import { InitialState, useApollo } from '../appolo/client';
import { ApolloProvider } from '@apollo/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/';
import theme from '../src/theme/theme';
import { useRouter } from 'next/router';
import { GET_USER } from '../src/graphql/queries/queries';
import { useEffect } from 'react';
import { toastMessageAtom, userAtom } from '../src/store';
import { User } from '../src/__generated__/graphql';
import { useUpdateAtom } from 'jotai/utils';
import { Toast } from '../src/components/toast/toast';

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
  const setUser = useUpdateAtom(userAtom);
  const apolloClient = useApollo(pageProps.initialApolloState);
  const setMessage = useUpdateAtom(toastMessageAtom);

  const shouldAuth = !PUBLIC_ROUTES.includes(router.pathname);

  useEffect(() => {
    if (shouldAuth) {
      apolloClient
        .query({ query: GET_USER })
        .then(({ data }: { data: { user: User | null } }) => {
          setUser(data?.user);
        })
        .catch((error) => {
          setMessage(error.message);
          router.push('/login');
        });
    }
  }, [apolloClient, router, setMessage, setUser, shouldAuth]);

  return (
    <ApolloProvider client={apolloClient}>
      <HeadComponent />
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Toast />
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
}
