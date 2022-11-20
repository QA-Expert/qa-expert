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
import { CLAIM_BADGE } from '../../graphql/mutations/mutations';
import { GET_USER } from '../../graphql/queries/queries';
import { userAtom } from '../../store';
import { Box } from '../box/box';
import { ProgressBar } from '../progress-bar/progress-bar';
import VerifiedIcon from '@mui/icons-material/Verified';
import TimerIcon from '@mui/icons-material/Timer';
import {
  CourseProgressState,
  GetAllCoursesQuery,
} from '../../__generated__/graphql';
import { addDays, formatDuration, intervalToDuration } from 'date-fns';
import { useEffect, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';

type Props = GetAllCoursesQuery['courses'][number];

const getRetakeQuizTime = (duration: Duration) =>
  formatDuration(duration, {
    delimiter: ', ',
  });

export const CardComponent = ({
  _id,
  title,
  description,
  progress,
  badge,
}: Props) => {
  // TODO: Create custom react hook to put all that logic in it
  const [user, setUser] = useAtom(userAtom);
  const [claimBadge] = useMutation(CLAIM_BADGE, {
    // TODO: figure out why we have to refetch user and setUser atom does not work and update user
    refetchQueries: [
      {
        query: GET_USER,
      },
    ],
  });
  const isPassedCourse = progress.state === CourseProgressState.Pass;
  const isFailedCourse = progress.state === CourseProgressState.Fail;
  const lastSubmittedDate = new Date(progress.submittedAt);
  const canRetakeDate = addDays(
    lastSubmittedDate,
    Number(process.env.NEXT_PUBLIC_COURSE_COOLDOWN),
  );
  const nowDate = new Date();
  const duration = intervalToDuration({
    start: nowDate,
    end: canRetakeDate,
  });
  const [timeLeftToRetake, setTimeLeftToRetake] = useState<string>(
    getRetakeQuizTime(duration),
  );
  const isBadgeClaimed = badge?._id
    ? user?.badges?.includes(badge?._id)
    : false;
  const canRetakeQuiz = nowDate >= canRetakeDate;

  useEffect(() => {
    const intervalId = setInterval(() => {
      const duration = intervalToDuration({
        start: new Date(),
        end: canRetakeDate,
      });
      setTimeLeftToRetake(getRetakeQuizTime(duration));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  });

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
                  console.log('Retake quiz');
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
