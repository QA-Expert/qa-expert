'use client';

import { Suspense } from 'react';
import { PaymentMethod } from './payment-method/payment-method';
import { Subscription } from './subscription/subscription';
import { Row } from '@/components/row/row';
import { Skeletons } from '@/components/skeleton/skeleton';

export function Billing() {
  return (
    <Row sx={{ gap: '1rem', justifyContent: 'center' }}>
      <Suspense fallback={<Skeletons width={350} height={350} />}>
        <PaymentMethod />
      </Suspense>

      <Suspense fallback={<Skeletons width={350} height={350} />}>
        <Subscription />
      </Suspense>
    </Row>
  );
}
