import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import { CourseProgressState } from '../../__generated__/graphql';
import IconButton from '@mui/material/IconButton';
import CardActions from '@mui/material/CardActions';
import ButtonGroup from '@mui/material/ButtonGroup';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import DoneAll from '@mui/icons-material/DoneAll';
import { CourseStates } from './course-states';
import { ProgressBar } from '../progress-bar/progress-bar';
import Link from 'next/link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Row } from '../row/row';
import { CourseMetrics } from './course-metrics';
import { useTheme } from '@mui/material/styles';
import { LikeIcon } from '../icons/like';
import { ShareIcon } from '../icons/share';
import { ArrowIcon } from '../icons/arrow';
import { CourseLevelLabel } from './course-level-label';
import { Box } from '../box/box';
import Button from '@mui/material/Button';
import { CourseProps } from '../../../pages/courses';
import { CardImage } from './card-image';

export function CardContainer(props: CourseProps) {
  const theme = useTheme();
  // TODO: Better way to figure out if user is Logged in
  // We need to look into cookie for access_token and validate it on UI as well
  const isUserLoggedInBasedOnProgress = 'progress' in props;

  return (
    <Card
      id={`course-${props._id}`}
      sx={{
        position: 'relative',
        width: '420px',
        minHeight: '320px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        outlineColor: 'transparent',
        '&:hover': {
          outline: '0.125rem solid',
          outlineColor: theme.palette.secondary.main,
          transition: '.2s outline ease',
        },
        [theme.breakpoints.down('md')]: {
          width: '320px',
        },
      }}
      raised
    >
      <Row sx={{ backgroundColor: 'primary.light' }}>
        <CardHeader title={props.title} sx={{ height: '5rem' }} />

        <Box sx={{ alignSelf: 'flex-start' }}>
          <CourseLevelLabel level={props.level} />
        </Box>
      </Row>

      <Row
        sx={{
          gap: '1rem',
          [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
          },
        }}
      >
        <CardImage
          alt={props.title}
          src="/images/course-default-card.svg"
          width={250}
          breakPointWidth={350}
          height={150}
        >
          {isUserLoggedInBasedOnProgress && <CourseStates _id={props._id} />}
        </CardImage>

        <CourseMetrics pages={props.pages} />
      </Row>

      <CardActions
        sx={{
          display: 'flex',
          gap: '0.5rem',
          marginTop: 'auto',
          alignSelf: 'start',
          width: '100%',
          paddingRight: 0,
        }}
      >
        <ButtonGroup
          aria-label="course card actions button group"
          sx={{ flex: '1' }}
        >
          <IconButton
            aria-label="add to favorites"
            onClick={async (e) => {
              e.preventDefault();
            }}
          >
            <LikeIcon
              width="24"
              height="24"
              color={theme.palette.secondary.main}
            />
          </IconButton>

          <IconButton
            aria-label="share"
            onClick={async (e) => {
              e.preventDefault();
            }}
          >
            <ShareIcon
              width="24"
              height="24"
              color={theme.palette.secondary.main}
            />
          </IconButton>
        </ButtonGroup>
      </CardActions>

      {isUserLoggedInBasedOnProgress && <ProgressBar _id={props._id} />}

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

          {isUserLoggedInBasedOnProgress ? (
            <Box
              sx={{
                flex: 1,
                padding: '1rem 1rem 1rem 0',
              }}
            >
              <Link href={`/course/${props._id}`}>
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
          <Typography sx={{ padding: '1rem' }}>{props.description}</Typography>

          {props.recommendedCourses.length > 0 && (
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

              {props.recommendedCourses.map((course) => (
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
    </Card>
  );
}
