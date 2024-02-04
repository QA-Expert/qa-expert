'use client';

import { Box } from '@/components/box/box';
import { PaymentMethod } from './payment-method/payment-method';

export function Billing() {
  return (
    <Box>
      <h1>Billing</h1>
      <h1>Transactions</h1>

      <PaymentMethod />
    </Box>
  );
}
