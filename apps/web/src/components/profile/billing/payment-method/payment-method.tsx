import Typography from '@mui/material/Typography/Typography';
import { GetUserActivitiesQuery } from '__generated__/graphql';
import { Card } from '@/components/profile/card/card';
import { GET_PAYMENT_METHOD } from 'graphql/queries/queries';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { useError } from 'utils/hooks';
import { useMutation } from '@apollo/client';
import {
  ADD_PAYMENT_METHOD,
  REMOVE_PAYMENT_METHOD,
} from 'graphql/mutations/mutations';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import { useMemo } from 'react';
import { getPaymentMethodInfoString } from './handlers';
import { Row } from '@/components/row/row';

export function PaymentMethodCard() {
  const { data, error } = useSuspenseQuery(GET_PAYMENT_METHOD);
  const [remove, { error: removeError, loading: loadingRemove }] = useMutation(
    REMOVE_PAYMENT_METHOD,
    {
      refetchQueries: [GET_PAYMENT_METHOD],
    },
  );
  const [upsert, { error: updateError, loading: loadingUpdate }] = useMutation(
    ADD_PAYMENT_METHOD,
    {
      refetchQueries: [GET_PAYMENT_METHOD],
    },
  );
  const paymentMethodData = useMemo(
    () => getPaymentMethodInfoString(data.paymentMethod),
    [data],
  );

  useError([error?.message, updateError?.message, removeError?.message]);

  return (
    <Card
      sx={{
        maxWidth: '350px',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: 'secondary.main',
          fontSize: '1rem',
          textTransform: 'uppercase',
        }}
      >
        Payment Method Information
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: 'text.secondary',
        }}
      >
        Payment Method: {paymentMethodData}
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: 'text.secondary',
        }}
      >
        Billing Address: {data.paymentMethod?.address ?? '--'}
      </Typography>

      <Row
        sx={{
          gap: '1rem',
          justifyContent: 'center',
          flex: 1,
          alignItems: 'flex-end',
        }}
      >
        <LoadingButton
          variant="contained"
          loading={loadingUpdate}
          onClick={async () => await upsert()}
        >
          update
        </LoadingButton>

        <LoadingButton
          variant="outlined"
          color="error"
          loading={loadingRemove}
          onClick={async () => await remove()}
        >
          Remove
        </LoadingButton>
      </Row>
    </Card>
  );
}
