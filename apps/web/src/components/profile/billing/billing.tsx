'use client';

import { Box } from '@/components/box/box';
import {
  AddressElement,
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from '@stripe/react-stripe-js';
import { useCardPaymentMethod } from './hooks';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button/Button';

export function Billing() {
  const { createPaymentMethod } = useCardPaymentMethod();

  const handleSubmit = async () => {
    const result = await createPaymentMethod();
    console.log(result);
  };

  return (
    <Box>
      <h1>Billing</h1>
      <h1>Transactions</h1>

      <Form>
        <AddressElement options={{ mode: 'billing' }} />
        <CardNumberElement />
        <CardExpiryElement />
        <CardCvcElement />
      </Form>

      <Button variant="contained" onClick={handleSubmit}>
        Add
      </Button>
    </Box>
  );
}

const Form = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  width: '100%',
  height: '100%',
  backgroundColor: 'white',
  padding: '2rem',
});
