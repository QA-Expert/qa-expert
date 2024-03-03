import { GET_PAYMENT_METHOD } from 'graphql/queries/queries';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { useError } from 'utils/hooks';
import { useMutation } from '@apollo/client';
import { REMOVE_PAYMENT_METHOD } from 'graphql/mutations/mutations';
import { ConfirmationModal } from '@/components/confirmation-modal/confirmation-modal';
import { PaymentMethodCard } from './card/card';
import { useState } from 'react';
import { PaymentMethodModal } from './modal/modal';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { Typography } from '@mui/material';

export function PaymentMethod() {
  const [removeConfirmationModalOpen, setRemoveConfirmationModalOpen] =
    useState(false);
  const [paymentMethodModalOpen, setPaymentMethodModalOpen] = useState(false);
  const [paymentModalType, setPaymentModalType] = useState<'update' | 'add'>(
    'add',
  );
  const { data, error } = useSuspenseQuery(GET_PAYMENT_METHOD);
  const [remove, { error: removeError, loading: removeLoading }] = useMutation(
    REMOVE_PAYMENT_METHOD,
    {
      refetchQueries: [GET_PAYMENT_METHOD],
    },
  );

  useError([error?.message, removeError?.message]);

  const handleOnRemove = async () => {
    await remove();
    setRemoveConfirmationModalOpen(false);
  };

  return (
    <>
      <PaymentMethodCard
        paymentMethod={data.paymentMethod}
        onUpdate={() => {
          setPaymentMethodModalOpen(true);
          setPaymentModalType('update');
        }}
        onAdd={() => {
          setPaymentMethodModalOpen(true);
          setPaymentModalType('add');
        }}
        onRemove={() => setRemoveConfirmationModalOpen(true)}
        removeLoading={removeLoading}
      />

      <ConfirmationModal
        onCancel={() => setRemoveConfirmationModalOpen(false)}
        onConfirm={handleOnRemove}
        title={'Confirm payment method removal'}
        content={
          <>
            <WarningAmberIcon fontSize="large" />
            <Typography>
              This action will delete the payment method from your account. You
              will need to add a new payment method to continue your
              subscription.
            </Typography>
          </>
        }
        open={removeConfirmationModalOpen}
        buttonName={'Confirm Removal'}
      />

      <PaymentMethodModal
        defaultValues={data.paymentMethod}
        key={Date.now()}
        type={paymentModalType}
        onCancel={() => setPaymentMethodModalOpen(false)}
        open={paymentMethodModalOpen}
      />
    </>
  );
}
