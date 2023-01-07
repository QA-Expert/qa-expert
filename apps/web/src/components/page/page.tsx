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
import CircularProgress from '@mui/material/CircularProgress';
import { useProgressTimer } from './page.hook';

export default function Page(
  props: FragmentType<typeof PageFragmentFragmentDoc>,
) {
  const page = useFragment(PageFragmentFragmentDoc, props);
  const countUpProgress = useProgressTimer(
    Number(process.env.NEXT_PUBLIC_TIME_TO_REVIEW_COURSE_PAGE),
  );

  return (
    <Box
      sx={{
        width: '100%',
        justifyContent: 'start',
        height: '100%',
        padding: '1rem',
        gap: '2rem',
      }}
    >
      <Box sx={{ flexDirection: 'row', gap: '1rem' }}>
        {/* Visual effect for course page - when it is going into pass state */}
        {page.type === CourseType.Course &&
          page.progress?.state !== PageProgressState.Pass && (
            <Box sx={{ position: 'relative' }}>
              <CircularProgress
                variant="determinate"
                value={countUpProgress}
                sx={{ position: 'absolute', color: 'secondary.light' }}
              />
              <CheckCircleIcon
                sx={{ color: 'success.main', fontSize: '3rem', opacity: 0.4 }}
              />
            </Box>
          )}

        {page.progress?.state === PageProgressState.Pass && (
          <CheckCircleIcon sx={{ color: 'success.main', fontSize: '3rem' }} />
        )}
        {page.progress?.state === PageProgressState.Fail && (
          <CancelIcon sx={{ color: 'error.main', fontSize: '3rem' }} />
        )}

        <Typography variant="h3" sx={{ fontSize: '1.5rem' }}>
          {page.title}
        </Typography>
      </Box>

      <Typography>{page.description}</Typography>
      {page.type === CourseType.Course ? (
        <CoursePage {...page} />
      ) : (
        <QuizPage {...page} />
      )}
    </Box>
  );
}
