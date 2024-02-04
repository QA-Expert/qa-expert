import { Box } from '@/components/box/box';
import { Card } from '@/components/profile/card/card';
import { CardTitle } from '@/components/profile/card/card-title';
import { Row } from '@/components/row/row';
import { useMutation } from '@apollo/client';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import Typography from '@mui/material/Typography/Typography';
import { SubscriptionStatus } from '__generated__/graphql';
import {
  ACTIVATE_SUBSCRIPTION,
  CANCEL_SUBSCRIPTION,
} from 'graphql/mutations/mutations';
import { GET_PAYMENT_METHOD, GET_SUBSCRIPTION } from 'graphql/queries/queries';
import { capitalize } from 'lodash';
import { useError } from 'utils/hooks';

export function Subscription() {
  const { data, error } = useSuspenseQuery(GET_SUBSCRIPTION);
  const { data: paymentMethodData, error: paymentMethodError } =
    useSuspenseQuery(GET_PAYMENT_METHOD);
  const [activate, { error: activationError, loading: activationLoading }] =
    useMutation(ACTIVATE_SUBSCRIPTION);
  const [
    deactivate,
    { error: deactivationError, loading: deactivationLoading },
  ] = useMutation(CANCEL_SUBSCRIPTION);

  useError([
    activationError?.message,
    deactivationError?.message,
    error?.message,
    paymentMethodError?.message,
  ]);

  return (
    <Card
      sx={{
        width: '350px',
        minHeight: '350px',
        padding: '2rem',
      }}
    >
      <CardTitle>Subscription</CardTitle>

      <Box sx={{ flex: 1 }}>
        <Typography variant="h3" sx={{ color: 'success.main' }}>
          {capitalize(data.subscription?.status ?? SubscriptionStatus.Inactive)}
        </Typography>

        {!paymentMethodData.paymentMethod ? (
          <Typography textAlign="center">
            Please Add Payment Method to Activate your Subscription
          </Typography>
        ) : null}
      </Box>

      <Row sx={{ justifyContent: 'center' }}>
        {data.subscription?.status === SubscriptionStatus.Active ? (
          <LoadingButton
            variant="outlined"
            color="error"
            loading={deactivationLoading}
            onClick={async () => deactivate()}
          >
            Deactivate
          </LoadingButton>
        ) : (
          <LoadingButton
            variant="contained"
            color="warning"
            disabled={!paymentMethodData.paymentMethod}
            loading={activationLoading}
            onClick={async () => activate()}
          >
            Activate
          </LoadingButton>
        )}
      </Row>
    </Card>
  );
}
