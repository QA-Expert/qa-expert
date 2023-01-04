import { useMemo } from 'react';
import {
  ApolloClient,
  ApolloLink,
  from,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import merge from 'deepmerge';
import { onError } from '@apollo/client/link/error';
import { GetServerSidePropsContext } from 'next';
import { IncomingHttpHeaders } from 'http';
import { isEqual } from 'lodash';
import { isAuthTokenValid } from '../utils/auth';

let apolloClient: ApolloClient<NormalizedCacheObject>;
export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

const setAuthLink = (ctx?: GetServerSidePropsContext) =>
  new ApolloLink((operation, forward) => {
    // it auth token valid -> add the authorization cookie from Next Context to the headers
    // for outgoing graphql requests
    operation.setContext(({ headers }: { headers: IncomingHttpHeaders }) => ({
      headers: {
        ...headers,
        Cookie:
          ctx?.req.headers.cookie && isAuthTokenValid(ctx.req.headers.cookie)
            ? ctx.req.headers.cookie
            : undefined,
      },
    }));

    return forward(operation);
  });

const errorLink = onError(({ graphQLErrors, networkError }) => {
  let isAuthError = false;

  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
      if (extensions.code === 'UNAUTHENTICATED') {
        isAuthError = true;
      }

      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}, Extension: ${extensions.code}`,
      );
    });

  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }

  if (isAuthError) {
    console.log('TEST');
  }
});

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL,
  credentials: 'include',
});

export function createApolloClient(ctx?: GetServerSidePropsContext) {
  return new ApolloClient({
    name: 'qa-expert-web-client',
    ssrMode: typeof window === 'undefined',
    link: from([setAuthLink(ctx), errorLink, httpLink]),
    cache: new InMemoryCache(),
    connectToDevTools: process.env.NODE_ENV !== 'production',
    defaultOptions: {
      // NOTE: https://www.apollographql.com/docs/react/data/error-handling/#graphql-error-policies
      query: {
        errorPolicy: 'none',
      },
      mutate: {
        errorPolicy: 'none',
      },
    },
  });
}

export type InitialState = NormalizedCacheObject | null;

export interface ApolloStateProps {
  [APOLLO_STATE_PROP_NAME]: InitialState;
}

/**
 * Reference link to code
 * https://github.com/vercel/next.js/blob/canary/examples/api-routes-apollo-server-and-client-auth
 */
export function initializeApollo(
  initialState: InitialState = null,
  ctx?: GetServerSidePropsContext,
) {
  const _apolloClient = apolloClient ?? createApolloClient(ctx);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s)),
        ),
      ],
    });

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
export function useApollo(pageProps: ApolloStateProps) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);

  return store;
}
