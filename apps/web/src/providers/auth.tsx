import React, { useState, useContext, createContext, ReactNode } from 'react';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  from,
} from '@apollo/client';
import { UserInputLogin } from 'graphql-schema-gen/schema.gen';
import { LOGIN } from '../graphql/mutations/mutations';
import { onError } from '@apollo/client/link/error';

interface AuthProviderProps {
  children: ReactNode;
}

// eslint-disable-next-line @typescript-eslint/ban-types
const authContext = createContext<typeof useProvideAuth | {}>({});

export function AuthProvider({ children }: AuthProviderProps) {
  const auth = useProvideAuth();

  return (
    <authContext.Provider value={auth}>
      <ApolloProvider client={auth.createApolloClient()}>
        {children}
      </ApolloProvider>
    </authContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(authContext);
};

const useProvideAuth = () => {
  const [authToken, setAuthToken] = useState<string | null>(null);

  const isLoggedIn = () => {
    if (authToken) {
      return true;
    } else {
      return false;
    }
  };

  const getAuthHeaders = () => {
    if (!authToken) return null;

    return {
      authorization: `Bearer ${authToken}`,
    };
  };

  const createApolloClient = () => {
    const httpLink = new HttpLink({
      uri: 'http://localhost:3001/graphql',
      headers: getAuthHeaders(),
    });

    return new ApolloClient({
      name: 'qa-school-web-client',
      ssrMode: typeof window === 'undefined',
      link: from([httpLink, errorLink]),
      cache: new InMemoryCache(),
      connectToDevTools: true, // TODO: put under env
    });
  };

  const logIn = async ({ email, password }: UserInputLogin) => {
    const client = createApolloClient();

    const result = await client.mutate({
      mutation: LOGIN,
      variables: { email, password },
    });

    console.log(result);

    if (result?.data?.login?.access_token) {
      setAuthToken(result.data.login.access_token);
    }
  };

  const logOut = () => {
    setAuthToken(null);
  };

  return {
    setAuthToken,
    isLoggedIn,
    logIn,
    logOut,
    createApolloClient,
  };
};

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  if (networkError) console.error(`[Network error]: ${networkError}`);
});
