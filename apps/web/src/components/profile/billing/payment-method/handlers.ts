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
