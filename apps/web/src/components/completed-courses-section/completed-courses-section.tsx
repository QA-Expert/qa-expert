import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { createRef, forwardRef } from 'react';
import { CourseProps } from '../../../pages/courses';
import { useWidth } from '../../../utils/hooks';
import { Box } from '../box/box';
import { ArrowIcon } from '../icons/arrow';
import { Row } from '../row/row';
import { CompletedCourseCard } from './completed-course-card';
import { getCoursesToShowBySectionWidth } from './handlers';

type Props = {
  courses: CourseProps[];
};

export const CARD_WIDTH = 250;

export function CompletedCoursesSection({ courses }: Props) {
  const theme = useTheme();
  const ref = createRef<HTMLDivElement>();
  const sectionWidth = useWidth(ref);
  const { remainingCoursesToShow, coursesToShow } =
    getCoursesToShowBySectionWidth(sectionWidth, courses);

  return (
    <PaperWithForwardedRef ref={ref}>
      <Box sx={{ flex: 1, gap: 0 }}>
        <Row
          sx={{
            padding: '1rem',
            gap: '1rem',
            [theme.breakpoints.down('md')]: {
              flexDirection: 'column',
            },
          }}
        >
          <Typography
            sx={{ fontSize: '1.5rem' }}
            color="secondary.light"
            variant="h4"
          >
            Completed
          </Typography>

          <Row
            sx={{
              [theme.breakpoints.down('md')]: {
                justifyContent: 'center',
              },
            }}
          >
            {coursesToShow.map((course, i) => (
              <CompletedCourseCard key={i} {...course} />
            ))}
          </Row>
        </Row>

        <Accordion
          disabled={remainingCoursesToShow.length === 0}
          sx={{
            width: '100%',
            color: 'text.secondary',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <AccordionSummary
            expandIcon={
              <ArrowIcon
                width="24"
                height="24"
                color={theme.palette.secondary.main}
              />
            }
            aria-controls="show-more-completed-courses"
            id="show-more-completed-courses"
          >
            <Typography>Show more</Typography>
          </AccordionSummary>

          <AccordionDetails sx={{ padding: 0 }}>
            <Row
              sx={{
                flexWrap: 'wrap',
                gap: '1rem',
                padding: '0 1rem 1rem 1rem',
                justifyContent: 'center',
              }}
            >
              {remainingCoursesToShow.map((course, i) => (
                <CompletedCourseCard key={i} {...course} />
              ))}
            </Row>
          </AccordionDetails>
        </Accordion>
      </Box>
    </PaperWithForwardedRef>
  );
}

const PaperWithForwardedRef = forwardRef<
  HTMLDivElement,
  React.PropsWithChildren
>(function MuiPaper(props, ref) {
  return (
    <Paper
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
      }}
      ref={ref}
    >
      {props.children}
    </Paper>
  );
});
