'use client';

import { Suspense } from 'react';
import { PaymentMethod } from './payment-method/payment-method';
import { Subscription } from './subscription/subscription';
import { Row } from '@/components/row/row';
import { Skeletons } from '@/components/skeleton/skeleton';
import { GET_PRICES } from 'graphql/queries/queries';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { useReactiveVar } from '@apollo/client';
import { isAuthenticated } from 'apollo/store';
import { useError } from 'utils/hooks';

export function Billing() {
  const isUserAuthenticated = useReactiveVar(isAuthenticated);
  const { data: pricesData, error: pricesError } = useSuspenseQuery(
    GET_PRICES,
    {
      skip: !isUserAuthenticated,
    },
  );

  useError([pricesError?.message]);

  return (
    <Row sx={{ gap: '1rem', justifyContent: 'center' }}>
      <Suspense fallback={<Skeletons width={350} height={350} />}>
        <PaymentMethod />
      </Suspense>

      <Suspense fallback={<Skeletons width={350} height={350} />}>
        {pricesData?.prices.map((price) => (
          <Subscription key={price.id} price={price} />
        ))}
      </Suspense>
    </Row>
  );
}
