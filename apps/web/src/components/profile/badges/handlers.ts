import { GetAllAndUnlockedBadgesQuery } from '__generated__/graphql';

export const getClaimedBadge = (
  unlockedBadges: GetAllAndUnlockedBadgesQuery['unlockedBadges'],
  badgeId: string,
) => {
  return unlockedBadges?.find((ub) => ub.badge === badgeId);
};
