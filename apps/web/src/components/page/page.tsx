import Typography from '@mui/material/Typography';
import {
  CourseType,
  PageFragmentFragmentDoc,
  PageProgressState,
} from '../../__generated__/graphql';
import { Box } from '../box/box';
import CoursePage from '../course-page/course-page';
import QuizPage from '../quiz-page/quiz-page';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  FragmentType,
  useFragment,
} from '../../__generated__/fragment-masking';
import { StatusIndicator } from '../status-indicator/status-indicator';

export default function Page(
  props: FragmentType<typeof PageFragmentFragmentDoc>,
) {
  const page = useFragment(PageFragmentFragmentDoc, props);

  console.log(page.progress?.state);
  return (
    <Box
      sx={{
        width: '100%',
        padding: '1rem',
        gap: '2rem',
      }}
    >
      <Box sx={{ flexDirection: 'row', gap: '1rem' }}>
        <StatusIndicator
          sx={{ fontSize: '3rem' }}
          state={page.progress?.state}
        />

        <Typography
          variant="h3"
          sx={{ fontSize: '1.5rem' }}
          color={'warning.main'}
        >
          {page.title}
        </Typography>
      </Box>

      <Box sx={{ gap: '2rem' }}>
        <Typography>{page.description}</Typography>

        {page.type === CourseType.Course ? (
          <CoursePage {...page} />
        ) : (
          <QuizPage {...page} />
        )}
      </Box>
    </Box>
  );
}
