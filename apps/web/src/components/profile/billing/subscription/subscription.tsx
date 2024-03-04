import { Box } from '@/components/box/box';
import { Card } from '@/components/profile/card/card';
import { CardTitle } from '@/components/profile/card/card-title';
import { Row } from '@/components/row/row';
import { useMutation } from '@apollo/client';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import Typography from '@mui/material/Typography/Typography';
import { GetPricesQuery, SubscriptionStatus } from '__generated__/graphql';
import { CANCEL_SUBSCRIPTION } from 'graphql/mutations/mutations';
import { GET_PAYMENT_METHOD, GET_SUBSCRIPTION } from 'graphql/queries/queries';
import { capitalize } from 'lodash';
import { useError } from 'utils/hooks';
import { format } from 'date-fns';
import { CheckoutModal } from '../checkout-modal/checkout-modal';
import { useState } from 'react';
import { getSubscriptionButtonName } from '../utils';
import { DATE_FORMAT } from 'constants/constants';

type Props = {
  price: GetPricesQuery['prices'][number];
};

export function Subscription({ price }: Props) {
  const { data, error } = useSuspenseQuery(GET_SUBSCRIPTION);
  const { data: paymentMethodData, error: paymentMethodError } =
    useSuspenseQuery(GET_PAYMENT_METHOD);
  const [cancel, { error: cancelError, loading: cancelLoading }] = useMutation(
    CANCEL_SUBSCRIPTION,
    {
      refetchQueries: [GET_SUBSCRIPTION],
    },
  );

  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  const { subscription } = data;
  const { paymentMethod } = paymentMethodData;

  useError([error?.message, paymentMethodError?.message, cancelError?.message]);

  return (
    <>
      <Card
        sx={{
          width: '350px',
          minHeight: '350px',
          padding: '2rem',
        }}
      >
        <CardTitle>Subscription</CardTitle>

        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h3"
            sx={{ color: 'success.main', fontWeight: 'bold' }}
          >
            {capitalize(subscription?.status ?? SubscriptionStatus.Inactive)}
          </Typography>

          {price.amount ? (
            <Row sx={{ justifyContent: 'center', alignItems: 'baseline' }}>
              <Typography
                sx={{
                  color: 'secondary.main',
                  fontSize: '2rem',
                  fontWeight: 'bold',
                }}
              >
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

          {subscription?.status === SubscriptionStatus.Active ? (
            <Box sx={{ justifyContent: 'center' }}>
              <Typography sx={{ color: 'text.secondary' }}>
                Current Subscription period
              </Typography>
              <Typography sx={{ color: 'secondary.main' }}>
                {format(subscription.currentPeriodStart, DATE_FORMAT)}
                {' - '}
                {format(subscription.currentPeriodEnd, DATE_FORMAT)}
              </Typography>
            </Box>
          ) : null}

          {subscription?.status === SubscriptionStatus.Canceled ? (
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
              disabled={!paymentMethod}
              onClick={() => setCheckoutModalOpen(true)}
            >
              {getSubscriptionButtonName(subscription)}
            </LoadingButton>
          ) : (
            <>
              {subscription.status === SubscriptionStatus.Active ? (
                <LoadingButton
                  variant="outlined"
                  color="error"
                  loading={cancelLoading}
                  onClick={async () =>
                    await cancel({
                      variables: {
                        externalId: subscription.externalId,
                      },
                    })
                  }
                >
                  {getSubscriptionButtonName(subscription)}
                </LoadingButton>
              ) : null}

              {subscription.status === SubscriptionStatus.Canceled ? (
                <LoadingButton
                  variant="contained"
                  color="warning"
                  disabled={!paymentMethod}
                  onClick={() => setCheckoutModalOpen(true)}
                >
                  {getSubscriptionButtonName(subscription)}
                </LoadingButton>
              ) : null}
            </>
          )}
        </Row>
      </Card>

      <CheckoutModal
        open={checkoutModalOpen}
        onCancel={() => setCheckoutModalOpen(false)}
        price={price}
      />
    </>
  );
}
