import { useMutation } from '@apollo/client';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useAtom } from 'jotai';
import Image from 'next/image';
import Link from 'next/link';
import {
  CLAIM_BADGE,
  DELETE_PAGES_PROGRESSES,
} from '../../graphql/mutations/mutations';
import {
  GET_ALL_COURSES,
  GET_COURSE,
  GET_USER,
} from '../../graphql/queries/queries';
import { userAtom } from '../../store';
import { Box } from '../box/box';
import { ProgressBar } from '../progress-bar/progress-bar';
import VerifiedIcon from '@mui/icons-material/Verified';
import TimerIcon from '@mui/icons-material/Timer';
import {
  CourseProgressState,
  CourseType,
  GetAllCoursesQuery,
} from '../../__generated__/graphql';
import Tooltip from '@mui/material/Tooltip';
import { useDurationToRetakeQuiz } from './card.hook';
import { useError } from '../../../utils/hooks';

type Props = GetAllCoursesQuery['courses'][number];

export const CardComponent = ({
  _id,
  title,
  description,
  progress,
  badge,
  pages,
}: Props) => {
  const [user, setUser] = useAtom(userAtom);
  const [claimBadge, { error: badgeError }] = useMutation(CLAIM_BADGE, {
    // TODO: figure out why we have to refetch user and setUser atom does not work and update user
    refetchQueries: [
      {
        query: GET_USER,
      },
    ],
  });
  const [deletePagesProgresses, { error: progressError }] = useMutation(
    DELETE_PAGES_PROGRESSES,
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
                const { data } = await claimBadge({
                  variables: { badgeId: badge?._id },
                });
                setUser(
                  (prev) =>
                    prev && {
                      ...prev,
                      ...data?.claimBadge,
                    },
                );
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

                  const pagesProgressesToRemove = pages
                    .filter((page) => page.type === CourseType.Quiz)
                    .map((page) => page._id);

                  await deletePagesProgresses({
                    variables: { pages: pagesProgressesToRemove },
                  });
                }}
              >
                Retake quiz
              </Button>
            </Box>
          )}

          <Card
            sx={{
              width: '220px',
              height: '220px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            raised
          >
            <CardHeader title={title} />
            <CardMedia>
              <Image
                alt={`${title}`}
                width={'100%'}
                height={'100%'}
                src={`/images/course-default-card.svg`}
                objectFit="cover"
              />
            </CardMedia>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            </CardContent>
          </Card>

          <ProgressBar {...progress} />
        </Box>
      </a>
    </Link>
  );
};
