import {
  GetSubscriptionQuery,
  SubscriptionStatus,
} from '__generated__/graphql';

export const getSubscriptionButtonName = (
  subscription: GetSubscriptionQuery['subscription'],
) => {
  if (!subscription || subscription.status === SubscriptionStatus.Inactive) {
    return 'Subscribe';
  }

  if (subscription.status === SubscriptionStatus.Active) {
    return 'Cancel';
  }

  return 'Activate';
};
