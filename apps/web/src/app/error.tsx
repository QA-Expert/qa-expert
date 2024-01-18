'use client'; // Error components must be Client Components
import Typography from '@mui/material/Typography/Typography';
import Main from '@/components/main/main';
import Link from 'next/link';
import Button from '@mui/material/Button/Button';
import { Box } from '@/components/box/box';
import { ApolloError } from '@apollo/client';

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const isAuthError =
    error.name === 'ApolloError'
      ? Boolean(
          (error as ApolloError).graphQLErrors.find(
            (graphQlError) =>
              graphQlError.extensions.code === 'UNAUTHENTICATED',
          ),
        )
      : false;

  return (
    <Main>
      <Box sx={{ gap: '1rem' }}>
        {isAuthError ? (
          <>
            <Typography variant="h3">Unable to Authenticate</Typography>
            <Typography variant="body1">Please try to login</Typography>
            <Link href="/login">
              <Button variant="contained">Go to Login</Button>
            </Link>
          </>
        ) : (
          <>
            <Typography variant="h3">Something went wrong</Typography>
            <Typography variant="body1">{error.message}</Typography>
            <Link href="/">
              <Button variant="contained">Go to main page</Button>
            </Link>
          </>
        )}
      </Box>
    </Main>
  );
}
