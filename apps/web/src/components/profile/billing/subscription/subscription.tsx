import { Box } from '@/components/box/box';
import { Card } from '@/components/profile/card/card';
import { CardTitle } from '@/components/profile/card/card-title';
import { Row } from '@/components/row/row';
import { useMutation } from '@apollo/client';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import Typography from '@mui/material/Typography/Typography';
import { GetPricesQuery, SubscriptionStatus } from '__generated__/graphql';
import {
  ACTIVATE_SUBSCRIPTION,
  CANCEL_SUBSCRIPTION,
  SUBSCRIBE,
} from 'graphql/mutations/mutations';
import { GET_PAYMENT_METHOD, GET_SUBSCRIPTION } from 'graphql/queries/queries';
import { capitalize } from 'lodash';
import { useError } from 'utils/hooks';
import { format } from 'date-fns';

type Props = {
  price: GetPricesQuery['prices'][number];
};

export function Subscription({ price }: Props) {
  const { data, error } = useSuspenseQuery(GET_SUBSCRIPTION);
  const { data: paymentMethodData, error: paymentMethodError } =
    useSuspenseQuery(GET_PAYMENT_METHOD);
  const [subscribe, { error: subscribeError, loading: subscribeLoading }] =
    useMutation(SUBSCRIBE, {
      refetchQueries: [GET_SUBSCRIPTION],
    });
  const [activate, { error: activationError, loading: activationLoading }] =
    useMutation(ACTIVATE_SUBSCRIPTION, {
      refetchQueries: [GET_SUBSCRIPTION],
    });
  const [
    deactivate,
    { error: deactivationError, loading: deactivationLoading },
  ] = useMutation(CANCEL_SUBSCRIPTION, {
    refetchQueries: [GET_SUBSCRIPTION],
  });

  const { subscription } = data;
  const { paymentMethod } = paymentMethodData;

  useError([
    activationError?.message,
    deactivationError?.message,
    error?.message,
    paymentMethodError?.message,
    subscribeError?.message,
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
          {capitalize(subscription?.status ?? SubscriptionStatus.Inactive)}
        </Typography>

        {price.amount ? (
          <Row sx={{ justifyContent: 'center', alignItems: 'baseline' }}>
            <Typography sx={{ color: 'secondary.main', fontSize: '2rem' }}>
              ${price.amount / 100}
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>/ month</Typography>
          </Row>
        ) : null}

        {!paymentMethod ? (
          <Typography
            sx={{
              textAlign: 'center',
              color: 'secondary.main',
            }}
          >
            Please Add Payment Method to Activate your Subscription
          </Typography>
        ) : null}

        {subscription?.status === SubscriptionStatus.Active &&
        subscription.currentPeriodStart ? (
          <Typography sx={{ color: 'text.secondary', textAlign: 'center' }}>
            Last Payment was made on{' '}
            {format(subscription.currentPeriodStart, 'MM/dd/yyyy')}
          </Typography>
        ) : null}

        {subscription?.cancelationReason ? (
          <Typography sx={{ color: 'error.main', textAlign: 'center' }}>
            {subscription.cancelationReason}
          </Typography>
        ) : null}
      </Box>

      <Row sx={{ justifyContent: 'center' }}>
        {!subscription ? (
          <LoadingButton
            variant="contained"
            color="warning"
            loading={subscribeLoading}
            disabled={!paymentMethod}
            onClick={async () =>
              subscribe({
                variables: {
                  data: {
                    priceId: price.id,
                  },
                },
              })
            }
          >
            Subscribe
          </LoadingButton>
        ) : (
          <>
            {subscription.status === SubscriptionStatus.Active ? (
              <LoadingButton
                variant="outlined"
                color="error"
                loading={deactivationLoading}
                onClick={async () =>
                  deactivate({
                    variables: {
                      externalId: subscription.externalId,
                    },
                  })
                }
              >
                Cancel
              </LoadingButton>
            ) : null}

            {subscription.status === SubscriptionStatus.Canceled ? (
              <LoadingButton
                variant="contained"
                color="warning"
                disabled={!paymentMethod}
                loading={activationLoading}
                onClick={async () =>
                  activate({
                    variables: {
                      externalId: subscription.externalId,
                    },
                  })
                }
              >
                Activate
              </LoadingButton>
            ) : null}
          </>
        )}
      </Row>
    </Card>
  );
}
