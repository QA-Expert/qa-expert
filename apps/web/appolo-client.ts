import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

const httpLink = new HttpLink({ uri: 'http://localhost:3001/graphql' });

const client = new ApolloClient({
  name: 'qa-school-web-client',
  // TODO: Add error handling Link
  // TODO: Add Auth Link
  link: from([errorLink, httpLink]), // TODO: put under env
  cache: new InMemoryCache(),
  ssrMode: true,
  connectToDevTools: true, // TODO: put under env
});

export default client;
