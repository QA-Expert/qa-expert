import { useMutation } from '@apollo/client';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Course as Props } from 'graphql-schema-gen/schema.gen';
import { useAtom } from 'jotai';
import Image from 'next/image';
import Link from 'next/link';
import { CLAIM_BADGE } from '../../graphql/mutations/mutations';
import { GET_USER } from '../../graphql/queries/queries';
import { userAtom } from '../../store';
import { Box } from '../box/box';
import { ProgressBar } from '../progress-bar/progress-bar';
import VerifiedIcon from '@mui/icons-material/Verified';

export const CardComponent = ({
  _id,
  title,
  description,
  progress,
  badge,
}: Props) => {
  const [user, setUser] = useAtom(userAtom);
  const [claimBadge] = useMutation(CLAIM_BADGE, {
    // TODO: figure out why we have to refetch user and setUser atom does not work and update user
    refetchQueries: [
      {
        query: GET_USER,
      },
    ],
  });
  const isPassedCourse = progress.pass === 100 && progress.fail === 0;
  const isFailedCourse =
    progress.fail > 0 && progress.pass + progress.fail >= 100;
  const isBadgeClaimed = badge?._id
    ? user?.badges?.includes(badge?._id)
    : false;

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
            <VerifiedIcon
              fontSize="large"
              sx={{
                position: 'absolute',
                top: '-15px',
                right: '-15px',
                zIndex: 'mobileStepper',
              }}
            />
          )}
          {isPassedCourse && !isBadgeClaimed && (
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
                      ...data.claimBadge,
                    },
                );
              }}
            >
              Claim Reward
            </Button>
          )}

          {isFailedCourse && (
            <Button
              variant="contained"
              color="success"
              sx={{
                position: 'absolute',
                zIndex: 'mobileStepper',
              }}
              onClick={async (e) => {
                e.preventDefault();
                console.log('Retake quiz');
              }}
            >
              Retake quiz
            </Button>
          )}
          <Card
            sx={{
              width: '220px',
              height: '220px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              pointerEvents: isFailedCourse ? 'none' : 'auto',
              opacity: isFailedCourse ? 0.6 : 1,
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
