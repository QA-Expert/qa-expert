'use client';

import { Box } from '@/components/box/box';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { GET_CREDIT_CARD } from 'graphql/queries/queries';
import { useError } from 'utils/hooks';

export function Billing() {
  const { data, error } = useSuspenseQuery(GET_CREDIT_CARD);

  useError([error?.message]);

  return (
    <Box>
      <h1>Billing {data?.creditCard?._id}</h1>
    </Box>
  );
}
