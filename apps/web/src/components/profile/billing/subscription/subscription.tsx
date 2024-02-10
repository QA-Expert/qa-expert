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
          {capitalize(data.subscription?.status ?? SubscriptionStatus.Inactive)}
        </Typography>

        {price.amount ? (
          <Row sx={{ justifyContent: 'center', alignItems: 'baseline' }}>
            <Typography sx={{ color: 'secondary.main', fontSize: '2rem' }}>
              ${price.amount / 100}
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>/ month</Typography>
          </Row>
        ) : null}

        {!paymentMethodData.paymentMethod ? (
          <Typography sx={{ color: 'text.secondary' }}>
            Please Add Payment Method to Activate your Subscription
          </Typography>
        ) : null}

        {data.subscription?.status === SubscriptionStatus.Active &&
        data.subscription.currentPeriodStart ? (
          <Typography sx={{ color: 'text.secondary' }}>
            Last Payment was on{' '}
            {format(data.subscription.currentPeriodStart, 'MM/dd/yyyy')}
          </Typography>
        ) : null}
      </Box>

      <Row sx={{ justifyContent: 'center' }}>
        {!data.subscription ? (
          <LoadingButton
            variant="contained"
            color="warning"
            loading={subscribeLoading}
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
        ) : null}

        {data.subscription?.status === SubscriptionStatus.Active ? (
          <LoadingButton
            variant="outlined"
            color="error"
            loading={deactivationLoading}
            onClick={async () =>
              deactivate({
                variables: {
                  externalId: data.subscription.externalId,
                },
              })
            }
          >
            Cancel
          </LoadingButton>
        ) : null}

        {data.subscription?.status === SubscriptionStatus.Canceled ? (
          <LoadingButton
            variant="contained"
            color="warning"
            disabled={!paymentMethodData.paymentMethod}
            loading={activationLoading}
            onClick={async () =>
              activate({
                variables: {
                  externalId: data.subscription.externalId,
                },
              })
            }
          >
            Activate
          </LoadingButton>
        ) : null}
      </Row>
    </Card>
  );
}
