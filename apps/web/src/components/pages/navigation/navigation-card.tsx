import Card from '@mui/material/Card';
import { Box } from '@/components/box/box';
import { CardAccordion } from '@/components/card/card-accordion';
import { CardActions } from '@/components/card/card-actions';
import { CardImage } from '@/components/card/card-image';
import { CourseLevelLabel } from '@/components/card/course-level-label';
import { CourseStates } from '@/components/card/course-states';
import { ProgressBar } from '@/components/progress-bar/progress-bar';
import { Row } from '@/components/row/row';
import { INIT_WIDTH } from '@/components/sidebar/sidebar';
import { GetCourseQuery } from '__generated__/graphql';
import { Suspense } from 'react';

export function NavigationCard(course: GetCourseQuery['course']) {
  return (
    <Card sx={{ width: INIT_WIDTH }} raised>
      <Row
        sx={{
          gap: '1rem',
        }}
      >
        <CardImage
          alt={course.title}
          src="/images/course-default-card.svg"
          width={INIT_WIDTH}
          height={150}
        >
          <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
            <CourseLevelLabel level={course.level} />
          </Box>

          <Suspense fallback={'...Loading'}>
            <CourseStates {...course} />
          </Suspense>
        </CardImage>
      </Row>

      <CardActions />

      <ProgressBar {...course} />

      <CardAccordion {...course} showOpenCourseButton={false} />
    </Card>
  );
}
