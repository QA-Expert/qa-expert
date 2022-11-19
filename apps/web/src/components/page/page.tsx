import Typography from '@mui/material/Typography';
import { PageFragmentFragmentDoc } from '../../__generated__/graphql';
import { Box } from '../box/box';
import CoursePage from '../course-page/course-page';
import QuizPage from '../quiz-page/quiz-page';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  FragmentType,
  useFragment,
} from '../../__generated__/fragment-masking';

export default function Page(
  props: FragmentType<typeof PageFragmentFragmentDoc>,
) {
  const page = useFragment(PageFragmentFragmentDoc, props);

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
        {page.progress?.state === 'PASS' && (
          <CheckCircleIcon sx={{ color: 'success.main', fontSize: '3rem' }} />
        )}
        {page.progress?.state === 'FAIL' && (
          <CancelIcon sx={{ color: 'error.main', fontSize: '3rem' }} />
        )}

        <Typography variant="h3" sx={{ fontSize: '1.5rem' }}>
          {page.title}
        </Typography>
      </Box>

      <Typography>{page.description}</Typography>

      {page.type === 'COURSE' ? (
        <CoursePage {...page} />
      ) : (
        <QuizPage {...page} />
      )}
    </Box>
  );
}
