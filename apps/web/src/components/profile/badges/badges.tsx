import { BadgeComponent } from '@/components/badge/badge';
import { Box } from '@/components/box/box';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { GET_BADGES_AND_USER } from 'graphql/queries/queries';
import { useError } from 'utils/hooks';

export function Badges() {
  const { data, error: badgesFetchError } =
    useSuspenseQuery(GET_BADGES_AND_USER);

  const { user, badges } = data;

  useError([badgesFetchError?.message]);

  return (
    <Box
      sx={{
        flexDirection: 'row',
        justifyContent: 'center',
        gap: '1rem',
        flexWrap: 'wrap',
      }}
    >
      {badges?.map((badge, i) => (
        <BadgeComponent
          key={i}
          {...badge}
          isEarned={Boolean(user?.badges?.includes(badge._id))}
        />
      ))}
    </Box>
  );
}
