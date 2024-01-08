import { Box } from '@/components/box/box';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { GET_SUBMITTED_USER_PROGRESSES } from 'graphql/queries/queries';
import { useError } from 'utils/hooks';

export function Progress() {
  const { data, error } = useSuspenseQuery(GET_SUBMITTED_USER_PROGRESSES);

  useError([error?.message]);

  return (
    <Box>
      <h1>Progress</h1>
      {data.submittedProgresses.map((progress) => {
        return (
          <Box key={progress._id}>
            <p>{progress.course.title}</p>
            <p>{progress.course.progress.state}</p>
            <p>{progress.totalProgress}</p>
          </Box>
        );
      })}
    </Box>
  );
}
