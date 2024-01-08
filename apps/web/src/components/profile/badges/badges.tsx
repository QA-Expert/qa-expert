import { BadgeComponent } from '@/components/badge/badge';
import { Box } from '@/components/box/box';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import Typography from '@mui/material/Typography/Typography';
import {
  GET_BADGES_SUBMITTED_PROGRESSES_USER,
  GET_USER,
} from 'graphql/queries/queries';
import { useError } from 'utils/hooks';

export function Badges() {
  const { data: userData, error: userFetchError } = useSuspenseQuery(GET_USER);
  const { data: badgesData, error: badgesFetchError } = useSuspenseQuery(
    GET_BADGES_SUBMITTED_PROGRESSES_USER,
  );

  const user = userData?.user;
  const badges = badgesData?.badges;

  useError([userFetchError?.message, badgesFetchError?.message]);

  return (
    <Box sx={{ gap: '1rem' }}>
      <Typography variant="h2" sx={{ fontSize: '2rem' }}>
        Badges
      </Typography>
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
    </Box>
  );
}
