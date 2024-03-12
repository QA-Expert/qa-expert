import { GetAllAndClaimedBadgesQuery } from '__generated__/graphql';

export const getClaimedBadge = (
  claimedBadges: GetAllAndClaimedBadgesQuery['claimedBadges'],
  badgeId: string,
) => {
  return claimedBadges?.find((cb) => cb.badge._id === badgeId);
};
