import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { Row } from '../row/row';
import { CourseLevelLabel } from './course-level-label';
import DoneAll from '@mui/icons-material/DoneAll';
import { ArrowIcon } from '../icons/arrow';
import ListItemText from '@mui/material/ListItemText';
import { CourseProgressState } from '../../__generated__/graphql';
import { useTheme } from '@mui/material/styles';
import { CourseProps } from '../../../pages/courses';
import { Box } from '../box/box';

type Props = {
  _id: CourseProps['_id'];
  recommendedCourses: CourseProps['recommendedCourses'];
  description: CourseProps['description'];
  showOpenCourseButton: boolean;
};

export function CardAccordion({
  _id,
  recommendedCourses,
  description,
  showOpenCourseButton,
}: Props) {
  const theme = useTheme();

  return (
    <Accordion
      sx={{
        width: '100%',
        color: 'text.secondary',
      }}
      onClick={(e) => {
        e.preventDefault();
      }}
    >
      <Row>
        <AccordionSummary
          expandIcon={
            <ArrowIcon
              width="24"
              height="24"
              color={theme.palette.secondary.main}
            />
          }
          aria-controls="show-description-accordion"
          id="show-description-accordion"
        >
          <Typography>Description</Typography>{' '}
        </AccordionSummary>

        {showOpenCourseButton ? (
          <Box
            sx={{
              flex: 1,
              padding: '1rem 1rem 1rem 0',
              alignItems: 'end',
            }}
          >
            <Link href={`/course/${_id}`}>
              <Button
                variant="contained"
                color="success"
                sx={{ alignSelf: 'end' }}
              >
                Open Course
              </Button>
            </Link>
          </Box>
        ) : null}
      </Row>

      <AccordionDetails sx={{ padding: 0 }}>
        <Typography sx={{ padding: '1rem' }}>{description}</Typography>

        {recommendedCourses.length > 0 && (
          <List
            sx={{
              backgroundColor: 'background',
            }}
          >
            <Typography
              color="warning.main"
              sx={{
                padding: '1rem',
              }}
            >
              Next recommended courses
            </Typography>

            {recommendedCourses.map((course) => (
              <Link key={course._id} href={`#course-${course._id}`}>
                <ListItem
                  sx={{
                    height: '2.5rem',
                    padding: '0 1rem 0 1rem',
                    '&:hover': {
                      backgroundColor: 'primary.main',
                    },
                    width: '100%',
                  }}
                >
                  <Row sx={{ gap: '1rem' }}>
                    <CourseLevelLabel isMinified level={course.level} />
                    <ListItemText primary={course.title} sx={{ flex: 1 }} />

                    {'progress' in course &&
                      course.progress?.state === CourseProgressState.Pass && (
                        <ListItemIcon>
                          <DoneAll color="success" />
                        </ListItemIcon>
                      )}
                  </Row>
                </ListItem>
              </Link>
            ))}
          </List>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
