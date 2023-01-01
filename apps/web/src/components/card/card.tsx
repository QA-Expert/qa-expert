import { useMutation, useQuery } from '@apollo/client';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
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
  CourseType,
  GetAllCoursesQuery,
} from '../../__generated__/graphql';
import Tooltip from '@mui/material/Tooltip';
import { useDurationToRetakeQuiz } from './card.hook';
import { useError } from '../../../utils/hooks';
import IconButton from '@mui/material/IconButton';
import CardActions from '@mui/material/CardActions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Collapse from '@mui/material/Collapse';
import { useState } from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';

type Props = GetAllCoursesQuery['courses'][number];

export const CardComponent = ({
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

  const [expanded, setExpanded] = useState(false);

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

          <Card
            sx={{
              width: '300px',
              minHeight: '275px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            raised
          >
            <CardHeader title={title} sx={{ textAlign: 'center' }} />

            <CardMedia
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                padding: '0.5rem',
                backgroundColor: 'grey.400',
              }}
            >
              <Image
                alt={`${title}`}
                width={'100%'}
                height={'100%'}
                src={`/images/course-default-card.svg`}
                objectFit="cover"
              />
            </CardMedia>

            <CardContent sx={{ alignSelf: 'start' }}>
              <Typography variant="body2" color="text.secondary">
                Slides:
                {pages.filter((page) => page.type === CourseType.Course).length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Questions:
                {pages.filter((page) => page.type === CourseType.Quiz).length}
              </Typography>
            </CardContent>

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
                  <FavoriteIcon />
                </IconButton>
                <IconButton
                  aria-label="share"
                  onClick={async (e) => {
                    e.preventDefault();
                  }}
                >
                  <ShareIcon />
                </IconButton>
              </ButtonGroup>

              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setExpanded(!expanded);
                }}
                aria-expanded={expanded}
                aria-label="show description button"
              >
                Show Description
              </Button>
            </CardActions>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {description}
                </Typography>
              </CardContent>
            </Collapse>
          </Card>

          <ProgressBar {...progress} />
        </Box>
      </a>
    </Link>
  );
};
