import { ApolloClient, InMemoryCache, from } from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';
import { errorLink, httpLink, setAuthLink } from './utils';
import { headers } from 'next/headers';

export const { getClient } = registerApolloClient(() => {
  const token = headers().get('Cookie');

  return new ApolloClient({
    name: 'qa-expert-web-client',
    connectToDevTools: process.env.NODE_ENV !== 'production',
    cache: new InMemoryCache(),
    link: from([setAuthLink(token), errorLink, httpLink]),
  });
});
