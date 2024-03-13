import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import VerifiedIcon from '@mui/icons-material/Verified';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import ShareIcon from '@mui/icons-material/Share';
import { useMemo, useState } from 'react';
import { DropdownMenu } from '@/components/dropdown-menu/dropdown-menu';
import Tooltip from '@mui/material/Tooltip/Tooltip';
import { GetAllAndClaimedBadgesQuery } from '__generated__/graphql';
import { Card } from '@/components/profile/card/card';
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
} from 'react-share';
import { BASE_URL } from 'constants/constants';

type Badge = GetAllAndClaimedBadgesQuery['badges'][number];

interface Props extends Badge {
  isEarned: boolean;
  unlockedDate?: string;
  claimedBadgeId?: string;
  studentName?: string;
}

export const BadgeCard = ({
  title,
  description,
  course,
  isEarned,
  unlockedDate,
  claimedBadgeId,
  studentName,
}: Props) => {
  const [anchorElShareButton, setAnchorElShareButton] =
    useState<null | HTMLElement>(null);
  const claimedBadgeUrl = `${BASE_URL}/claimed-badge/${claimedBadgeId}`;

  const handleOpenShareMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElShareButton(event.currentTarget);
  };

  const handleCloseShareMenu = () => {
    setAnchorElShareButton(null);
  };

  const shareMenuItems = useMemo(
    () => [
      {
        element: (
          <LinkedinShareButton
            title={`QA Expert - ${title}`}
            summary={`We're thrilled to congratulate ${studentName} for successfully completing our ${course?.title} course!`}
            source={'QA Expert'}
            url={claimedBadgeUrl}
          >
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
        ),
      },
      {
        element: (
          <FacebookShareButton hashtag="qaexpert.io" url={claimedBadgeUrl}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        ),
      },
    ],
    [claimedBadgeUrl, course?.title, studentName, title],
  );

  return (
    <>
      <Card
        sx={{
          pointerEvents: isEarned ? 'auto' : 'none',
          opacity: isEarned ? 1 : 0.6,
          width: '300px',
          height: '300px',
          justifyContent: 'start',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0',
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

        <CardMedia>
          <VerifiedIcon fontSize="large" />
        </CardMedia>

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

            <Tooltip title="Share Badge on social platforms">
              <Button
                startIcon={<ShareIcon sx={{ color: 'text.primary' }} />}
                color="success"
                variant="outlined"
                size="small"
                onClick={handleOpenShareMenu}
              >
                Share
              </Button>
            </Tooltip>
          </CardActions>
        )}
      </Card>

      <DropdownMenu
        menuItems={shareMenuItems}
        ancherEl={anchorElShareButton}
        onClose={handleCloseShareMenu}
      />
    </>
  );
};
