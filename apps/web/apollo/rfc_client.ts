import { from } from '@apollo/client';
import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';
import { errorLink, httpLink, setAuthLink } from './utils';

export const makeClient = (token: string | null) => () => {
  const links = [setAuthLink(token), errorLink, httpLink];

  return new NextSSRApolloClient({
    name: 'qa-expert-web-client',
    connectToDevTools: process.env.NODE_ENV !== 'production',
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === 'undefined'
        ? from([
            new SSRMultipartLink({
              // This strips all interfaces with a `@defer` directive from your queries.
              stripDefer: false,
            }),
            ...links,
          ])
        : from(links),
  });
};
