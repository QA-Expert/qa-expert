import { GetAllAndClaimedBadgesQuery } from '__generated__/graphql';

export const getClaimedBadge = (
  claimedBadges: GetAllAndClaimedBadgesQuery['claimedBadges'],
  badgeId: string,
) => {
  return claimedBadges?.find((ub) => ub.badge === badgeId);
};
