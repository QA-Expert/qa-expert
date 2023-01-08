import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import {
  CourseProgressState,
  GetAllCoursesPublicQuery,
  GetAllCoursesQuery,
} from '../../__generated__/graphql';
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

type LoggedInUserCourses = Pick<
  GetAllCoursesQuery['courses'][number],
  | '_id'
  | 'title'
  | 'description'
  | 'pages'
  | 'progress'
  | 'badge'
  | 'recommendedCourses'
  | 'level'
>;

type PublicCourses = Pick<
  GetAllCoursesPublicQuery['coursesPublic'][number],
  '_id' | 'title' | 'description' | 'pages' | 'recommendedCourses' | 'level'
>;

export type CourseProps = LoggedInUserCourses | PublicCourses;

export function CardContainer(props: CourseProps) {
  const theme = useTheme();
  const isUserLoggedInBasedOnProgress = 'progress' in props;

  return (
    <Link href={isUserLoggedInBasedOnProgress ? `/course/${props._id}` : ''}>
      <a>
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
          }}
          raised
        >
          <CourseLevelLabel level={props.level} />

          <CardHeader
            title={props.title}
            sx={{ textAlign: 'center', height: '6rem' }}
          />

          <Row sx={{ gap: '1rem' }}>
            <CardMedia
              sx={{
                display: 'flex',
                justifyContent: 'start',
                position: 'relative',
              }}
            >
              <Image
                alt={`${props.title}`}
                width={'250px'}
                height={'150px'}
                src={`/images/course-default-card.svg`}
                objectFit="cover"
              />

              {isUserLoggedInBasedOnProgress && (
                <CourseStates
                  _id={props._id}
                  progress={props.progress}
                  badge={props.badge}
                />
              )}
            </CardMedia>

            <CourseMetrics pages={props.pages} />
          </Row>

          <CardActions
            sx={{
              display: 'flex',
              gap: '0.5rem',
              marginTop: 'auto',
              alignSelf: 'start',
              width: '100%',
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

          {isUserLoggedInBasedOnProgress && <ProgressBar {...props.progress} />}

          <Accordion
            sx={{
              width: '100%',
              color: 'text.secondary',
            }}
            onClick={(e) => {
              e.preventDefault();
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
              sx={{
                flexGrow: 0,
              }}
              aria-controls="show-description-accordion"
              id="show-description-accordion"
            >
              <Typography>Description</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: 0 }}>
              <Typography sx={{ padding: '1rem' }}>
                {props.description}
              </Typography>
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
                        <ListItemText primary={course.title} />
                        {'progress' in course &&
                          course.progress?.state ===
                            CourseProgressState.Pass && (
                            <ListItemIcon>
                              <DoneAll />
                            </ListItemIcon>
                          )}
                      </ListItem>
                    </Link>
                  ))}
                </List>
              )}
            </AccordionDetails>
          </Accordion>
        </Card>
      </a>
    </Link>
  );
}
