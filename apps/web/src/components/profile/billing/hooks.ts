import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { CreatePaymentMethodData } from '@stripe/stripe-js';
import { GET_USER } from 'graphql/queries/queries';
import { useCallback, useEffect, useState } from 'react';

export const useCardPaymentMethod = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { data: userData, error } = useSuspenseQuery(GET_USER);
  const [paymentMethodData, setPaymentMethodData] =
    useState<CreatePaymentMethodData>();
  const email = userData.user.email;

  const createSubscription = useCallback(async () => {
    if (!stripe || !paymentMethodData) {
      return;
    }

    const paymentMethod = await stripe.createPaymentMethod(paymentMethodData);
    // send payment method to BE
  }, [paymentMethodData, stripe]);

  useEffect(() => {
    const canCreatePaymentMethodData =
      stripe !== null && elements !== null && email;

    if (canCreatePaymentMethodData) {
      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        return;
      }

      setPaymentMethodData({
        type: 'card',
        card: cardElement,
        billing_details: {
          email: email,
        },
      });
    }
  }, [stripe, elements, email]);

  return {
    error,
    createSubscription,
  };
};
