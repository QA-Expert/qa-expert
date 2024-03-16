import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import VerifiedIcon from '@mui/icons-material/Verified';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import { GetAllAndClaimedBadgesQuery } from '__generated__/graphql';
import { Card } from '@/components/profile/card/card';
import {
  FacebookShareButton,
  LinkedinShareButton,
  LinkedinIcon,
  FacebookIcon,
} from 'react-share';
import Link from 'next/link';
import { Row } from '@/components/row/row';
import IconButton from '@mui/material/IconButton/IconButton';

type Badge = GetAllAndClaimedBadgesQuery['badges'][number];

interface Props extends Badge {
  isEarned: boolean;
  unlockedDate?: string;
  claimedBadgeId?: string;
}

export const BadgeCard = ({
  title,
  description,
  course,
  isEarned,
  unlockedDate,
  claimedBadgeId,
}: Props) => {
  const claimedBadgeUrl = `${global.window?.location.host}/claimed-badge/${claimedBadgeId}`;

  return (
    <>
      <Card
        sx={{
          pointerEvents: isEarned ? 'auto' : 'none',
          opacity: isEarned ? 1 : 0.6,
          width: '300px',
          justifyContent: 'start',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0',
          gap: '0.5rem',
        }}
      >
        <Typography
          sx={{
            backgroundColor: unlockedDate ? 'success.main' : 'secondary.main',
            margin: 0,
            color: 'primary.dark',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '2rem',
          }}
        >
          {unlockedDate
            ? `Unlocked on ${new Date(unlockedDate).toLocaleDateString()}`
            : 'Not Unlocked Yet'}
        </Typography>

        <Row sx={{ justifyContent: 'center', padding: '0.5rem' }}>
          <VerifiedIcon fontSize="large" />
        </Row>

        <CardContent>
          <Typography
            variant="h3"
            sx={{
              fontSize: '1.5rem',
              color: 'secondary.main',
              fontWeight: 'bold',
            }}
          >
            {title}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>

        {course && (
          <CardActions sx={{ gap: '1rem' }}>
            <Button
              color="success"
              variant="contained"
              href={`/course/${course?._id}`}
              size="small"
            >
              Go to Course
            </Button>

            <Link href={`/claimed-badge/${claimedBadgeId}`} target="_blank">
              <Button color="secondary" variant="contained" size="small">
                Go to Badge
              </Button>
            </Link>
          </CardActions>
        )}

        <Row sx={{ justifyContent: 'center', paddingBottom: '0.5rem' }}>
          <IconButton
            component={LinkedinShareButton}
            url={claimedBadgeUrl}
            style={{ padding: '0.5rem' }}
          >
            <LinkedinIcon size={32} round />
          </IconButton>

          <IconButton
            component={FacebookShareButton}
            hashtag="qaexpert.io"
            url={claimedBadgeUrl}
            style={{ padding: '0.5rem' }}
          >
            <FacebookIcon size={32} round />
          </IconButton>
        </Row>
      </Card>
    </>
  );
};
