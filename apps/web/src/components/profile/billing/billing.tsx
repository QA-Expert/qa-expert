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
import { BorderBox } from '@/components/box/border-box';
import Typography from '@mui/material/Typography/Typography';
import { GET_PAYMENT_METHOD } from 'graphql/queries/queries';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import { useError } from 'utils/hooks';
import { useMutation } from '@apollo/client';
import { REMOVE_PAYMENT_METHOD } from 'graphql/mutations/mutations';

export function Billing() {
  const { createPaymentMethod } = useCardPaymentMethod();
  const [removePaymentMethod, { error: removePaymentMethodError, loading }] =
    useMutation(REMOVE_PAYMENT_METHOD, {
      refetchQueries: [GET_PAYMENT_METHOD],
    });
  const { data: paymentMethodData, error: paymentMethodError } =
    useSuspenseQuery(GET_PAYMENT_METHOD);

  const handleSubmit = async () => {
    const result = await createPaymentMethod();
    console.log(result);
  };

  useError([paymentMethodError?.message, removePaymentMethodError?.message]);

  return (
    <Box>
      <h1>Billing</h1>
      <h1>Transactions</h1>

      <Form>
        <AddressElement options={{ mode: 'billing' }} />
        <CardNumberElement />
        <CardExpiryElement />
        <CardCvcElement />

        <Button variant="contained" onClick={handleSubmit}>
          Add
        </Button>
      </Form>

      <BorderBox>
        <Typography>
          {paymentMethodData.paymentMethod?.cardBrand ?? '--'}
        </Typography>
        <Typography>
          {paymentMethodData.paymentMethod?.cardLast4 ?? '--'}
        </Typography>
        <LoadingButton
          variant="contained"
          loading={loading}
          onClick={async () => await removePaymentMethod()}
        >
          Remove
        </LoadingButton>
      </BorderBox>
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
