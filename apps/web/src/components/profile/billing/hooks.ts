import { useMutation } from '@apollo/client';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import {
  AddressElement,
  CardNumberElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import {
  CreatePaymentMethodData,
  PaymentMethodCreateParams,
} from '@stripe/stripe-js';
import { ADD_PAYMENT_METHOD } from 'graphql/mutations/mutations';
import { GET_PAYMENT_METHOD, GET_USER } from 'graphql/queries/queries';
import { useCallback, useEffect, useState } from 'react';
import { useError } from 'utils/hooks';

export const useAddress = () => {
  const [address, setAddress] =
    useState<PaymentMethodCreateParams.BillingDetails.Address>();
  const elements = useElements();

  useEffect(() => {
    if (elements) {
      const addressElement = elements.getElement(AddressElement);

      addressElement?.on('change', (event) => {
        setAddress({
          ...event.value.address,
          line2: event.value.address.line2 ?? undefined,
        });
      });
    }
  }, [elements]);

  return address;
};

export const useCardPaymentMethod = () => {
  const address = useAddress();
  const stripe = useStripe();
  const elements = useElements();
  const { data: userData, error } = useSuspenseQuery(GET_USER);
  const [paymentMethodData, setPaymentMethodData] =
    useState<CreatePaymentMethodData>();
  const [addPaymentMethod, { error: mutationError }] = useMutation(
    ADD_PAYMENT_METHOD,
    {
      refetchQueries: [GET_PAYMENT_METHOD],
    },
  );
  const email = userData.user.email;

  const createPaymentMethod = useCallback(async () => {
    if (!stripe || !paymentMethodData) {
      throw new Error('Payment provider is not set');
    }

    try {
      const paymentMethod = await stripe.createPaymentMethod(paymentMethodData);

      if (!paymentMethod || !paymentMethod.paymentMethod?.id) {
        throw new Error(
          'Failed to create payment method with payment provider',
        );
      }

      return await addPaymentMethod({
        variables: {
          data: { paymentMethodId: paymentMethod.paymentMethod?.id },
        },
      });
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }, [addPaymentMethod, paymentMethodData, stripe]);

  useError([error?.message, mutationError?.message]);

  useEffect(() => {
    const canCreatePaymentMethodData =
      stripe !== null && elements !== null && email && address;

    if (canCreatePaymentMethodData) {
      const cardElement = elements.getElement(CardNumberElement);

      if (!cardElement) {
        return;
      }

      console.log('ADDING PAYMENT METHOD DATA', address);
      setPaymentMethodData({
        type: 'card',
        card: cardElement,
        billing_details: {
          email: email,
          address,
        },
      });
    }
  }, [stripe, elements, email, address]);

  return {
    error,
    createPaymentMethod,
  };
};
