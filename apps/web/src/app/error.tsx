'use client'; // Error components must be Client Components

import { useError } from 'utils/hooks';
import { useRouter } from 'next/navigation';
import { ApolloError, useApolloClient } from '@apollo/client';
import { useEffect } from 'react';
import { GET_ALL_COURSES_PUBLIC } from 'graphql/queries/queries';
import { isAuthenticated } from 'apollo/store';
import Typography from '@mui/material/Typography/Typography';
import Layout from '@/components/layout/layout';
import Main from '@/components/main/main';
import Link from 'next/link';
import Button from '@mui/material/Button/Button';
import { Box } from '@/components/box/box';

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
    const isAuthError =
      apolloError.name === 'ApolloError' &&
      Boolean(
        apolloError.graphQLErrors.find(
          (e) => e.extensions.code === 'UNAUTHENTICATED',
        ),
      );

    if (isAuthError) {
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

  return (
    <Main>
      <Box sx={{ gap: '1rem' }}>
        <Typography variant="h3">Something went wrong</Typography>
        <Link href="/">
          <Button variant="contained">Go to main page</Button>
        </Link>
      </Box>
    </Main>
  );
}
