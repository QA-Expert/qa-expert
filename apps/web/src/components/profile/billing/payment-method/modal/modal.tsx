import { ModalActionButtons } from '@/components/modal/action-buttons/action-buttons';
import { ModalContent } from '@/components/modal/content/content';
import { Modal } from '@/components/modal/modal';
import { ModalTitle } from '@/components/modal/title/title';
import FormHelperText from '@mui/material/FormHelperText';
import Divider from '@mui/material/Divider/Divider';
import Typography from '@mui/material/Typography/Typography';
import { Theme, useTheme } from '@mui/material/styles';
import styled from '@mui/material/styles/styled';
import {
  AddressElement,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import {
  CreatePaymentMethodData,
  StripeAddressElementChangeEvent,
  StripeCardCvcElementChangeEvent,
  StripeCardExpiryElementChangeEvent,
  StripeCardNumberElementChangeEvent,
  StripeElementStyleVariant,
} from '@stripe/stripe-js';
import { useCallback, useState } from 'react';
import { GET_PAYMENT_METHOD, GET_USER } from 'graphql/queries/queries';
import { useMutation } from '@apollo/client';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { ADD_PAYMENT_METHOD } from 'graphql/mutations/mutations';
import { useError } from 'utils/hooks';

type Props = {
  type: 'update' | 'add';
  open: boolean;
  onCancel: () => void;
};

export function PaymentMethodModal({ type, onCancel, open }: Props) {
  const stripe = useStripe();
  const [isIsAddressValid, setIsAddressValid] = useState(false);
  const [isCardNumberValid, setIsCardNumberValid] = useState(false);
  const [isCardExpiryValid, setIsCardExpiryValid] = useState(false);
  const [isCardCvvValid, setIsCardCvvValid] = useState(false);
  const [billingDetails, setBillingDetails] =
    useState<CreatePaymentMethodData['billing_details']>();

  const elements = useElements();
  const cardElement = elements?.getElement(CardNumberElement);

  const { data: userData, error } = useSuspenseQuery(GET_USER);
  const [addPaymentMethod, { error: mutationError, loading }] = useMutation(
    ADD_PAYMENT_METHOD,
    {
      refetchQueries: [GET_PAYMENT_METHOD],
    },
  );
  const theme = useTheme();
  // Styles for the text inside of the inputs
  const baseStyle: StripeElementStyleVariant = {
    iconColor: theme.palette.secondary.main,
    color: theme.palette.text.primary,
    fontFamily: theme.typography.fontFamily,
    fontSize: '16px',
  };

  useError([error?.message, mutationError?.message]);

  const handleAddressElementChange = (
    event: StripeAddressElementChangeEvent,
  ) => {
    if (event.empty) {
      setIsAddressValid(false);
    } else {
      setIsAddressValid(event.complete);

      setBillingDetails(
        event.value as CreatePaymentMethodData['billing_details'],
      );
    }
  };

  const handleCardNumberChange = (
    event: StripeCardNumberElementChangeEvent,
  ) => {
    if (event.empty || event.empty) {
      setIsCardNumberValid(false);
    } else {
      setIsCardNumberValid(event.complete);
    }
  };

  const handleCardExpiryChange = (
    event: StripeCardExpiryElementChangeEvent,
  ) => {
    if (event.empty || event.empty) {
      setIsCardExpiryValid(false);
    } else {
      setIsCardExpiryValid(event.complete);
    }
  };

  const handleCardCvvChange = (event: StripeCardCvcElementChangeEvent) => {
    if (event.empty || event.empty) {
      setIsCardCvvValid(false);
    } else {
      setIsCardCvvValid(event.complete);
    }
  };

  const handleConfirm = useCallback(async () => {
    if (!stripe || !billingDetails || !cardElement) {
      throw new Error('Payment provider is not set');
    }

    try {
      const paymentMethodData: CreatePaymentMethodData = {
        type: 'card',
        card: cardElement,
        billing_details: { ...billingDetails, email: userData.user.email },
      };

      const paymentMethod = await stripe.createPaymentMethod(paymentMethodData);

      if (!paymentMethod || !paymentMethod.paymentMethod?.id) {
        throw new Error(
          'Failed to create payment method with payment provider',
        );
      }

      await addPaymentMethod({
        variables: {
          data: { paymentMethodId: paymentMethod.paymentMethod?.id },
        },
      });

      onCancel();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }, [
    stripe,
    billingDetails,
    cardElement,
    userData.user.email,
    addPaymentMethod,
    onCancel,
  ]);

  return (
    <Modal open={open} keepMounted={false}>
      <ModalTitle>Payment Method</ModalTitle>
      <ModalContent>
        <Form>
          <Typography variant="h3" sx={{ fontSize: '1.5rem' }}>
            Billing Address
          </Typography>

          {/* @TODO: add autocomplete via google @url https://stripe.com/docs/js/elements_object/create_address_element#address_element_create-options-autocomplete */}
          <AddressElement
            onChange={handleAddressElementChange}
            options={{
              mode: 'billing',
              fields: {
                phone: 'always',
              },
              validation: {
                phone: {
                  required: 'always',
                },
              },
            }}
          />

          <Typography variant="h3" sx={{ fontSize: '1.5rem' }}>
            Card Information
          </Typography>

          <CardNumber
            onChange={handleCardNumberChange}
            options={{
              showIcon: true,
              style: {
                base: baseStyle,
              },
            }}
          />
          <CardExpiry
            onChange={handleCardExpiryChange}
            options={{
              style: {
                base: baseStyle,
              },
            }}
          />
          <CardCvv
            onChange={handleCardCvvChange}
            options={{
              style: {
                base: baseStyle,
              },
            }}
          />

          {!isIsAddressValid ||
          !isCardNumberValid ||
          !isCardExpiryValid ||
          !isCardCvvValid ? (
            <FormHelperText sx={{ color: 'error.main' }}>
              Please feel Address and Card Information fields, Full name and
              Phone number
            </FormHelperText>
          ) : null}
        </Form>
      </ModalContent>

      <Divider flexItem />

      <ModalActionButtons
        disabled={
          !isIsAddressValid ||
          !isCardNumberValid ||
          !isCardExpiryValid ||
          !isCardCvvValid
        }
        onConfirm={handleConfirm}
        onCancel={onCancel}
        isLoading={loading}
        confirmButtonName={type}
      />
    </Modal>
  );
}

const Form = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  width: '100%',
  height: '100%',
  padding: '2rem',
  overflowY: 'auto',
});

const getCardElementStyle = ({ theme }: { theme: Theme }) => ({
  color: theme.palette.text.primary,
  border: `solid`,
  borderWidth: '1px',
  borderColor: theme.palette.secondary.main,
  borderRadius: '4px',
  padding: '0.75rem',
  ':hover': {
    borderColor: theme.palette.secondary.light,
  },
  '&.StripeElement--invalid': {
    borderWidth: '2px',
    borderColor: theme.palette.error.main,
    color: theme.palette.error.main,
  },
});

const CardNumber = styled(CardNumberElement)(getCardElementStyle);
const CardExpiry = styled(CardExpiryElement)(getCardElementStyle);
const CardCvv = styled(CardCvcElement)(getCardElementStyle);
