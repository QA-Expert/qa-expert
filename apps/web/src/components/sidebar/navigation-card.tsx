import Card from '@mui/material/Card';
import { Box } from '../box/box';
import { CardAccordion } from '../card/card-accordion';
import { CardActions } from '../card/card-actions';
import { CardImage } from '../card/card-image';
import { CourseLevelLabel } from '../card/course-level-label';
import { CourseStates } from '../card/course-states';
import { ProgressBar } from '../progress-bar/progress-bar';
import { Row } from '../row/row';
import { INIT_WIDTH } from './sidebar';
import { GetCourseQuery } from '../../__generated__/graphql';

export function NavigationCard(props: GetCourseQuery['course']) {
  return (
    <Card sx={{ width: INIT_WIDTH }} raised>
      <Row
        sx={{
          gap: '1rem',
        }}
      >
        <CardImage
          alt={props.title}
          src="/images/course-default-card.svg"
          width={INIT_WIDTH}
          height={150}
        >
          <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
            <CourseLevelLabel level={props.level} />
          </Box>

          <CourseStates _id={props._id} />
        </CardImage>
      </Row>

      <CardActions />

      <ProgressBar _id={props._id} />

      <CardAccordion {...props} showOpenCourseButton={false} />
    </Card>
  );
}
