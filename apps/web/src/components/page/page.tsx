import Typography from '@mui/material/Typography';
import { CourseType, GetCourseQuery } from '../../__generated__/graphql';
import { Box } from '../box/box';
import CourseSection from '../course-section/course-section';
import QuizSection from '../quiz-section/quiz-section';
import { StatusIndicator } from '../status-indicator/status-indicator';
/**
 * @description Component that represents a page inside of the Course.
 * NOTE: it is not a separate routing page.
 */
export default function Page(page: GetCourseQuery['course']['pages'][number]) {
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
          <CourseSection {...page} />
        ) : (
          <QuizSection {...page} />
        )}
      </Box>
    </Box>
  );
}
