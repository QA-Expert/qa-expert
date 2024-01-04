'use client';

import { useMutation } from '@apollo/client';
import Button from '@mui/material/Button';
import {
  CLAIM_BADGE,
  DELETE_COURSE_PROGRESS,
} from 'graphql/mutations/mutations';
import { GET_ALL_COURSES, GET_COURSE, GET_USER } from 'graphql/queries/queries';
import VerifiedIcon from '@mui/icons-material/Verified';
import Tooltip from '@mui/material/Tooltip';
import { useDurationToRetakeQuiz } from './card.hook';
import { useError } from 'utils/hooks';
import { Box } from '@/components/box/box';
import { Timer } from '@/components/timer/timer';
import Typography from '@mui/material/Typography';
import { CourseProgressState, GetCourseQuery } from '__generated__/graphql';
import { Flag } from '@/components/flag/flag';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';

export const CourseStates = (course: GetCourseQuery['course']) => {
  const { data } = useSuspenseQuery(GET_USER);
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
          variables: { _id: course._id },
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
              <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
                <Flag text={'Completed'} direction="left" />
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
              variables: { _id: course._id },
            });
          }}
        >
          Retake Quiz
        </Button>
      ) : null}
    </Box>
  );
};
