import { useMemo } from 'react';
import {
  ApolloClient,
  from,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import merge from 'deepmerge';
import { onError } from '@apollo/client/link/error';

let apolloClient: ApolloClient<NormalizedCacheObject>;

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL,
  credentials: 'include',
});

export function createApolloClient() {
  return new ApolloClient({
    name: 'qa-expert-web-client',
    ssrMode: typeof window === 'undefined',
    link: from([errorLink, httpLink]),
    cache: new InMemoryCache(),
    connectToDevTools: process.env.NODE_ENV === 'production' ? false : true,
    defaultOptions: {
      query: {
        errorPolicy: 'all',
      },
      mutate: {
        errorPolicy: 'all',
      },
    },
  });
}

export type InitialState = NormalizedCacheObject | null;

/**
 * Reference link to code
 * https://github.com/vercel/next.js/blob/canary/examples/api-routes-apollo-server-and-client-auth
 */
export function initializeApollo(initialState: InitialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache);

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') {
    return _apolloClient;
  }

  // Create the Apollo Client once in the client
  if (!apolloClient) {
    apolloClient = _apolloClient;
  }

  return _apolloClient;
}

export function useApollo(initialState: InitialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);

  return store;
}
