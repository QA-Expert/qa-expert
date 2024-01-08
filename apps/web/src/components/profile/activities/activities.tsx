import { Box } from '@/components/box/box';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { GET_USER_ACTIVITIES } from 'graphql/queries/queries';
import { useError } from 'utils/hooks';

export function Activities() {
  const { data, error } = useSuspenseQuery(GET_USER_ACTIVITIES);

  useError([error?.message]);

  return (
    <Box>
      <h1>Activities {data.user._id}</h1>
    </Box>
  );
}
