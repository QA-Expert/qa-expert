import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  from,
} from '@apollo/client';
import { isAuthTokenValid } from '../utils/auth';
import { onError } from '@apollo/client/link/error';
import { GetServerSidePropsContext } from 'next';
import { IncomingHttpHeaders } from 'http';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';

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
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}, Extension: ${extensions.code}`,
      );
    });

  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL,
  credentials: 'include',
});

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: from([setAuthLink(ctx), errorLink, httpLink]),
  });
});
