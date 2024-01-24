import { ApolloClient, InMemoryCache, from } from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';
import { errorLink, httpLink, setAuthLink } from './utils';

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    ssrMode: true,
    name: 'qa-expert-web-client',
    connectToDevTools: process.env.NODE_ENV !== 'production',
    cache: new InMemoryCache(),
    link: from([setAuthLink(null), errorLink, httpLink]),
  });
});
