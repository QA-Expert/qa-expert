import { useMutation, useQuery } from '@apollo/client';
import Button from '@mui/material/Button';
import Link from 'next/link';
import {
  CLAIM_BADGE,
  DELETE_COURSE_PROGRESS,
} from '../../graphql/mutations/mutations';
import {
  GET_ALL_COURSES,
  GET_COURSE,
  GET_USER,
} from '../../graphql/queries/queries';
import { Box } from '../box/box';
import { ProgressBar } from '../progress-bar/progress-bar';
import VerifiedIcon from '@mui/icons-material/Verified';
import TimerIcon from '@mui/icons-material/Timer';
import {
  CourseProgressState,
  GetAllCoursesQuery,
} from '../../__generated__/graphql';
import Tooltip from '@mui/material/Tooltip';
import { useDurationToRetakeQuiz } from './card.hook';
import { useError } from '../../../utils/hooks';
import { CardComponent } from './card';

type Props = GetAllCoursesQuery['courses'][number];

export const CardContainer = ({
  _id,
  title,
  description,
  progress,
  badge,
  pages,
}: Props) => {
  const { data } = useQuery(GET_USER);
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

  const isPassedCourse = progress.state === CourseProgressState.Pass;
  const isFailedCourse = progress.state === CourseProgressState.Fail;
  const isBadgeClaimed = badge?._id
    ? user?.badges?.includes(badge?._id)
    : false;

  const { canRetakeQuiz, timeLeftToRetake } = useDurationToRetakeQuiz(
    progress.updatedAt,
  );

  return (
    <Link href={`/course/${_id}`}>
      <a>
        <Box
          sx={{
            position: 'relative',
            gap: '0.75rem',
            transition: 'transform .4s',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        >
          {isBadgeClaimed && (
            <Tooltip
              title={`Badge has been claimed`}
              arrow
              disableFocusListener
            >
              <VerifiedIcon
                fontSize="large"
                sx={{
                  position: 'absolute',
                  top: '-15px',
                  right: '-15px',
                  zIndex: 'mobileStepper',
                }}
              />
            </Tooltip>
          )}

          {isFailedCourse && !canRetakeQuiz && (
            <Tooltip
              title={`Quiz can be retaken in ${timeLeftToRetake}`}
              arrow
              disableFocusListener
            >
              <TimerIcon
                fontSize="large"
                sx={{
                  position: 'absolute',
                  top: '-15px',
                  right: '-15px',
                  zIndex: 'mobileStepper',
                }}
              />
            </Tooltip>
          )}

          {badge?._id && isPassedCourse && !isBadgeClaimed && (
            <Button
              variant="contained"
              color="success"
              sx={{
                position: 'absolute',
                zIndex: 'mobileStepper',
              }}
              onClick={async (e) => {
                e.preventDefault();
                await claimBadge({
                  variables: { badgeId: badge?._id },
                });
              }}
            >
              Claim Reward
            </Button>
          )}

          {isFailedCourse && (
            <Box
              sx={{
                position: 'absolute',
                zIndex: 'mobileStepper',
                gap: '2rem',
              }}
            >
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
                Retake quiz
              </Button>
            </Box>
          )}

          <CardComponent
            title={title}
            description={description}
            pages={pages}
          />

          {progress && <ProgressBar {...progress} />}
        </Box>
      </a>
    </Link>
  );
};
