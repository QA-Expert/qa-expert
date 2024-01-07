'use client'; // Error components must be Client Components

import { useError } from 'utils/hooks';
import { useRouter } from 'next/navigation';
import { ApolloError, useApolloClient } from '@apollo/client';
import { useEffect } from 'react';
import { GET_ALL_COURSES_PUBLIC } from 'graphql/queries/queries';
import { isAuthenticated } from 'apollo/store';

export default function GlobalError({
  error,
}: {
  error: (Error & { digest?: string }) | ApolloError;
}) {
  const router = useRouter();
  const apolloClient = useApolloClient();

  useError([error.message]);

  /**
   * @description Handling UNAUTHENTICATED error from graphql
   * 1. clear the apollo cache
   * 2. refetch public courses as use is not authed out at that out
   * 3. navigate to /courses route
   */
  useEffect(() => {
    const apolloError = error as ApolloError;

    if (
      apolloError.name === 'ApolloError' &&
      apolloError.graphQLErrors.find(
        (e) => e.extensions.code === 'UNAUTHENTICATED',
      )
    ) {
      isAuthenticated(false);

      apolloClient
        .resetStore()
        .then(() =>
          apolloClient.refetchQueries({ include: [GET_ALL_COURSES_PUBLIC] }),
        )
        .finally(() => router.push('/courses'))
        .catch((e) => console.error(e.message));
    }
  }, [error, router, apolloClient]);

  return null;
}
