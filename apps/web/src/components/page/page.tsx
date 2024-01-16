import Typography from '@mui/material/Typography';
import { CourseType, GetCourseQuery } from '__generated__/graphql';
import { Box } from '@/components/box/box';
import CourseSection from '@/components/course-section/course-section';
import QuizSection from '@/components/quiz-section/quiz-section';
import { StatusIndicator } from '@/components/status-indicator/status-indicator';
import { Suspense } from 'react';

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

      <Box sx={{ gap: '2rem', width: '100%' }}>
        <Typography>{page.description}</Typography>

        {page.type === CourseType.Course ? (
          <Suspense fallback={'...Loading'}>
            <CourseSection key={page._id} {...page} />
          </Suspense>
        ) : (
          <Suspense fallback={'...Loading'}>
            {/* Adding key helps to reset local state. Without key local state
            keeps the value of one of the first clicked components as
            we don't really change the position of this component in tree
            @url https://react.dev/learn/preserving-and-resetting-state#option-2-resetting-state-with-a-key */}
            <QuizSection key={page._id} {...page} />
          </Suspense>
        )}
      </Box>
    </Box>
  );
}
