import { useMutation, useQuery } from '@apollo/client';
import Button from '@mui/material/Button';
import {
  CLAIM_BADGE,
  DELETE_COURSE_PROGRESS,
} from '../../graphql/mutations/mutations';
import {
  GET_ALL_COURSES,
  GET_COURSE,
  GET_USER,
} from '../../graphql/queries/queries';
import VerifiedIcon from '@mui/icons-material/Verified';
import {
  CourseProgressState,
  GetAllCoursesQuery,
} from '../../__generated__/graphql';
import Tooltip from '@mui/material/Tooltip';
import { useDurationToRetakeQuiz } from './card.hook';
import { useError } from '../../../utils/hooks';
import { Box } from '../box/box';
import { Timer } from './timer';
import Typography from '@mui/material/Typography';

type Props = Pick<
  GetAllCoursesQuery['courses'][number],
  '_id' | 'progress' | 'badge'
>;

export const CardStates = ({ _id, progress, badge }: Props) => {
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
  const isNonInitState =
    (isPassedCourse && !isBadgeClaimed) || isFailedCourse || isBadgeClaimed;

  const { canRetakeQuiz, duration } = useDurationToRetakeQuiz(
    progress.updatedAt,
  );

  return (
    <Box
      sx={{
        display: 'flex',
        gap: '0.5rem',
        position: 'absolute',
        width: '100%',
        height: '100%',
        backdropFilter: isNonInitState ? 'blur(0.2rem)' : 'none',
      }}
    >
      {isBadgeClaimed && (
        <Tooltip title={`Badge has been claimed`} arrow disableFocusListener>
          <VerifiedIcon fontSize="large" />
        </Tooltip>
      )}

      {isFailedCourse && !canRetakeQuiz && (
        <Box>
          <Typography>Quiz can be retaken in:</Typography>
          <Timer duration={duration} />{' '}
        </Box>
      )}

      {badge?._id && isPassedCourse && !isBadgeClaimed && (
        <Button
          variant="contained"
          color="success"
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
      )}
    </Box>
  );
};
