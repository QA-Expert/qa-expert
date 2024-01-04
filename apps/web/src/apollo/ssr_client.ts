import { ApolloClient, InMemoryCache, from } from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';
import { errorLink, httpLink, setAuthLink } from './utils';
import { headers } from 'next/headers';
import { isAuthTokenValid } from 'utils/auth';
import { isAuthenticated } from './store';

export const { getClient } = registerApolloClient(() => {
  const token = headers().get('cookie');
  const authToken = token && isAuthTokenValid(token) ? token : undefined;

  isAuthenticated(Boolean(authToken));

  return new ApolloClient({
    ssrMode: true,
    name: 'qa-expert-web-client',
    connectToDevTools: process.env.NODE_ENV !== 'production',
    cache: new InMemoryCache(),
    link: from([setAuthLink(token), errorLink, httpLink]),
  });
});
