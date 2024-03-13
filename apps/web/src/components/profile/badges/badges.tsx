'use client';

import { BadgeCard } from '@/components/profile/badges/card';
import { Row } from '@/components/row/row';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { GET_ALL_AND_CLAIMED_BADGES } from 'graphql/queries/queries';
import { useError } from 'utils/hooks';
import { getClaimedBadge } from './handlers';

export function Badges() {
  const { data, error: badgesFetchError } = useSuspenseQuery(
    GET_ALL_AND_CLAIMED_BADGES,
  );

  const { claimedBadges, badges } = data;

  useError([badgesFetchError?.message]);

  return (
    <Row
      sx={{
        flexDirection: 'row',
        justifyContent: 'center',
        gap: '1rem',
        flexWrap: 'wrap',
      }}
    >
      {badges?.map((badge, i) => {
        const claimedBadge = getClaimedBadge(claimedBadges, badge._id);

        return (
          <BadgeCard
            key={i}
            {...badge}
            isEarned={Boolean(claimedBadge)}
            unlockedDate={claimedBadge?.createdAt}
            claimedBadgeId={claimedBadge?._id}
          />
        );
      })}
    </Row>
  );
}
