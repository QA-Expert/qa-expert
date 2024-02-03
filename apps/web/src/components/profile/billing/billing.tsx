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
import { PaymentMethodCard } from './payment-method/payment-method';

export function Billing() {
  const { createPaymentMethod } = useCardPaymentMethod();

  const handleSubmit = async () => {
    await createPaymentMethod();
  };

  return (
    <Box>
      <h1>Billing</h1>
      <h1>Transactions</h1>

      <Form>
        {/* @TODO: add autocomplete via google @url https://stripe.com/docs/js/elements_object/create_address_element#address_element_create-options-autocomplete */}
        <AddressElement options={{ mode: 'billing' }} />
        <CardNumberElement />
        <CardExpiryElement />
        <CardCvcElement />

        <Button variant="contained" onClick={handleSubmit}>
          Add
        </Button>
      </Form>

      <PaymentMethodCard />
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
