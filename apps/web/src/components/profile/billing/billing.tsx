'use client';

import { Box } from '@/components/box/box';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import {
  GET_BILLING_TRANSACTIONS,
  GET_CREDIT_CARD,
} from 'graphql/queries/queries';
import { useError } from 'utils/hooks';

export function Billing() {
  const { data: creditCardData, error: creditCardError } =
    useSuspenseQuery(GET_CREDIT_CARD);
  const { data: transactionsData, error: transactionsError } = useSuspenseQuery(
    GET_BILLING_TRANSACTIONS,
  );

  useError([transactionsError?.message, creditCardError?.message]);

  return (
    <Box>
      <h1>Billing {creditCardData?.creditCard?._id}</h1>
      <h1>
        Transactions
        {transactionsData?.transactions?.map((transaction) => (
          <div key={transaction._id}>{transaction.createdAt}</div>
        ))}
      </h1>
    </Box>
  );
}
