import Typography from '@mui/material/Typography';
import { Page as Props } from 'graphql-schema-gen/schema.gen';
import { Box } from '../box/box';
import CoursePage from '../course-page/course-page';
import QuizPage from '../quiz-page/quiz-page';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function Page(props: Props) {
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
        {props.progress?.state === 'PASS' && (
          <CheckCircleIcon sx={{ color: 'success.main', fontSize: '3rem' }} />
        )}
        {props.progress?.state === 'FAIL' && (
          <CancelIcon sx={{ color: 'error.main', fontSize: '3rem' }} />
        )}

        <Typography variant="h3" sx={{ fontSize: '1.5rem' }}>
          {props.title}
        </Typography>
      </Box>

      <Typography>{props.description}</Typography>

      {props.type === 'COURSE' ? (
        <CoursePage {...props} />
      ) : (
        <QuizPage {...props} />
      )}
    </Box>
  );
}
