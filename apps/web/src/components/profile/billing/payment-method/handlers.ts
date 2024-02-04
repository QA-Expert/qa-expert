import { GetPaymentMethodQuery } from '__generated__/graphql';
import { capitalize } from 'lodash';

export const getPaymentMethodInfoString = (
  data: GetPaymentMethodQuery['paymentMethod'],
) => {
  if (!data) {
    return '--';
  }

  return `${capitalize(data.type)} ${data.cardBrand.toUpperCase()} ${
    data.cardLast4
  }`;
};

export const getBillingAddressString = (
  data: GetPaymentMethodQuery['paymentMethod'],
) => {
  if (!data) {
    return '--';
  }

  const { line1, line2, city, state, country, postalCode } = data;

  return (
    `${line1 ? line1 + ', ' : ''}
  ${line2 ? line2 + ', ' : ''}
  ${city ? city + ', ' : ''}
  ${state ? state + ', ' : ''}
  ${country ? country + ', ' : ''}
  ${postalCode}` ?? '--'
  );
};
