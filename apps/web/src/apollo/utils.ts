import { ApolloLink, HttpLink } from '@apollo/client';
import { IncomingHttpHeaders } from 'http';
import { onError } from '@apollo/client/link/error';

export const setAuthLink = (token: string | null) =>
  new ApolloLink((operation, forward) => {
    // it auth token valid -> add the authorization cookie from Next Context to the headers
    // for outgoing graphql requests
    operation.setContext(({ headers }: { headers: IncomingHttpHeaders }) => ({
      headers: {
        ...headers,
        Cookie: token,
      },
    }));

    return forward(operation);
  });

export const errorLink = onError(({ graphQLErrors, networkError }) => {
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

export const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL,
  credentials: 'include',
});
