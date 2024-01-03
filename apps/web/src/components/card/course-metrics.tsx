import CardContent from '@mui/material/CardContent';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { CourseType } from '../../__generated__/graphql';
import { Box } from '../box/box';
import { PagesIcon } from '../icons/pages';
import { QuizIcon } from '../icons/quiz';
import { Row } from '../row/row';
import { CourseProps } from '../../../app/courses/page';

type Props = Pick<CourseProps, 'pages'>;

export function CourseMetrics({ pages }: Props) {
  const theme = useTheme();

  return (
    <CardContent
      component={Box}
      sx={{
        alignSelf: 'start',
        padding: 0,
        flex: 1,
        paddingRight: '1rem',
        paddingTop: '1rem',
        [theme.breakpoints.down('md')]: {
          minWidth: '50%',
          paddingTop: '0',
          paddingRight: '1rem',
          paddingLeft: '1rem',
        },
      }}
    >
      <Row>
        <PagesIcon />
        <Typography color="text.secondary" sx={{ flex: 1 }}>
          Slides
        </Typography>
        <Typography color="text.primary">
          {pages.filter((page) => page.type === CourseType.Course).length}
        </Typography>
      </Row>

      <Row>
        <QuizIcon />
        <Typography color="text.secondary" sx={{ flex: 1 }}>
          Questions
        </Typography>
        <Typography color="text.primary">
          {pages.filter((page) => page.type === CourseType.Quiz).length}
        </Typography>
      </Row>
    </CardContent>
  );
}
