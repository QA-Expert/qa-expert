import { useMutation, useQuery } from '@apollo/client';
import Button from '@mui/material/Button';
import {
  CLAIM_BADGE,
  DELETE_COURSE_PROGRESS,
} from '../../graphql/mutations/mutations';
import {
  GET_ALL_COURSES,
  GET_COURSE,
  GET_COURSE_PROGRESS_AND_BADGE,
  GET_USER,
} from '../../graphql/queries/queries';
import VerifiedIcon from '@mui/icons-material/Verified';
import Tooltip from '@mui/material/Tooltip';
import { useDurationToRetakeQuiz } from './card.hook';
import { useError } from '../../../utils/hooks';
import { Box } from '../box/box';
import { Timer } from '../timer/timer';
import Typography from '@mui/material/Typography';
import { CourseProgressState } from '../../__generated__/graphql';
import { Flag } from '../flag/flag';

type Props = {
  _id: string;
};

export const CourseStates = ({ _id }: Props) => {
  const { data } = useQuery(GET_USER);
  // NOTE Fetching course user specific data here in that component with useQuery
  // and not using data that came from SSR because when we send mutation query and fetch mutated course there is no way UI knows about changes in Apollo Cache
  // Where useQuery is hook that listens to the cache changes and keeps UI in sync
  const { data: courseData } = useQuery(GET_COURSE_PROGRESS_AND_BADGE, {
    variables: { _id },
  });
  const course = courseData?.course;
  const user = data?.user;
  const [claimBadge, { error: badgeError }] = useMutation(CLAIM_BADGE, {
    refetchQueries: [
      {
        query: GET_USER,
      },
    ],
  });
  const [deleteCourseProgresses, { error: progressError }] = useMutation(
    DELETE_COURSE_PROGRESS,
    {
      refetchQueries: [
        {
          query: GET_COURSE,
          variables: { _id },
        },
        {
          query: GET_ALL_COURSES,
        },
      ],
    },
  );

  useError([badgeError?.message, progressError?.message]);

  const { canRetakeQuiz, duration } = useDurationToRetakeQuiz(
    course?.progress.updatedAt ?? new Date().toUTCString(),
  );

  if (!course) {
    return null;
  }

  const isPassedCourse = course.progress.state === CourseProgressState.Pass;
  const isFailedCourse = course.progress.state === CourseProgressState.Fail;
  const isInProgressCourse =
    course.progress.state === CourseProgressState.InProgress;
  const isBadgeClaimed = course.badge?._id
    ? user?.badges?.includes(course.badge?._id)
    : false;

  return (
    <Box
      sx={{
        display: 'flex',
        position: 'absolute',
        width: '100%',
        height: '100%',
        backdropFilter: !isInProgressCourse ? 'blur(0.2rem)' : 'none',
      }}
    >
      {isFailedCourse && !canRetakeQuiz ? (
        <Box>
          <Typography>Quiz can be retaken in:</Typography>
          <Timer duration={duration} />
        </Box>
      ) : null}

      {isPassedCourse ? (
        <>
          {isBadgeClaimed ? (
            <>
              <Box sx={{ position: 'absolute', top: 0, left: 0 }}>
                <Flag text={'Completed'} />
              </Box>

              <Tooltip
                title={`Badge has been claimed`}
                arrow
                disableFocusListener
              >
                <VerifiedIcon fontSize="large" />
              </Tooltip>
            </>
          ) : (
            <>
              <Typography variant="h6" color="warning.main">
                Completed
              </Typography>

              <Button
                variant="contained"
                color="success"
                onClick={async (e) => {
                  e.preventDefault();

                  if (course.badge?._id) {
                    await claimBadge({
                      variables: { badgeId: course.badge._id },
                    });
                  } else {
                    throw new Error('Sorry, There is no badge to claim');
                  }
                }}
              >
                Claim Reward
              </Button>
            </>
          )}
        </>
      ) : null}

      {isFailedCourse ? (
        <Button
          variant="contained"
          disabled={!canRetakeQuiz}
          onClick={async (e) => {
            e.preventDefault();

            await deleteCourseProgresses({
              variables: { _id },
            });
          }}
        >
          Retake Quiz
        </Button>
      ) : null}
    </Box>
  );
};
