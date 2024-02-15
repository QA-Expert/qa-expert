import { ModalActionButtons } from '@/components/modal/action-buttons/action-buttons';
import { ModalContent } from '@/components/modal/content/content';
import { Modal } from '@/components/modal/modal';
import { ModalTitle } from '@/components/modal/title/title';
import { useMutation } from '@apollo/client';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { GetPricesQuery } from '__generated__/graphql';
import { ACTIVATE_SUBSCRIPTION, SUBSCRIBE } from 'graphql/mutations/mutations';
import { GET_SUBSCRIPTION } from 'graphql/queries/queries';
import { useCallback } from 'react';
import { useError } from 'utils/hooks';
import { getSubscriptionButtonName } from '../utils';
import Typography from '@mui/material/Typography/Typography';
import { add, format } from 'date-fns';
import { DATE_FORMAT } from 'constants/constants';

type Props = {
  open: boolean;
  onCancel: () => void;
  // price amount should be in cents
  price: GetPricesQuery['prices'][number];
};

export function CheckoutModal({ open, onCancel, price }: Props) {
  const { data, error } = useSuspenseQuery(GET_SUBSCRIPTION);
  const { subscription } = data;
  const today = new Date();
  // this logic matches logic on back end - we need to determine if we want to charge customer when they reactivate
  const isCurrentPeriodPayed =
    subscription?.currentPeriodEnd &&
    new Date(subscription.currentPeriodEnd) > today;

  const chargeAmountString = isCurrentPeriodPayed
    ? '$0'
    : `$${price.amount ?? 0 / 100}`;

  const nextPaymentDate = isCurrentPeriodPayed
    ? format(subscription.currentPeriodEnd, DATE_FORMAT)
    : format(add(today, { months: 1 }), DATE_FORMAT);

  const [subscribe, { error: subscribeError, loading: subscribeLoading }] =
    useMutation(SUBSCRIBE, {
      refetchQueries: [GET_SUBSCRIPTION],
    });
  const [activate, { error: activationError, loading: activationLoading }] =
    useMutation(ACTIVATE_SUBSCRIPTION, {
      refetchQueries: [GET_SUBSCRIPTION],
    });

  const handleOnConfirm = useCallback(async () => {
    let result;

    if (subscription) {
      result = await activate({
        variables: { externalId: subscription.externalId },
      });
    } else {
      result = await subscribe({
        variables: {
          data: {
            priceId: price.id,
          },
        },
      });
    }

    if (!result.errors || !result.errors.length) {
      onCancel();
    }
  }, [subscription, activate, subscribe, price.id, onCancel]);

  useError([activationError?.message, error?.message, subscribeError?.message]);

  return (
    <Modal open={open} onClose={onCancel}>
      <ModalTitle>Subscription Checkout</ModalTitle>
      <ModalContent>
        Charge: {chargeAmountString}
        {isCurrentPeriodPayed ? (
          <Typography>
            Current Subscription period was payed on{' '}
            {format(subscription.currentPeriodStart, DATE_FORMAT)}
          </Typography>
        ) : null}
        <Typography>
          Next Payment will be charged on {nextPaymentDate}
        </Typography>
      </ModalContent>
      <ModalActionButtons
        confirmButtonName={getSubscriptionButtonName(subscription)}
        isLoading={subscribeLoading || activationLoading}
        onConfirm={handleOnConfirm}
        onCancel={onCancel}
      />
    </Modal>
  );
}
