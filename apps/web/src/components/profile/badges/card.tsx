import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { GetAllAndUnlockedBadgesQuery } from '__generated__/graphql';
import VerifiedIcon from '@mui/icons-material/Verified';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import ShareIcon from '@mui/icons-material/Share';
import { useState } from 'react';
import { ShareMenu } from './share-menu';
import Tooltip from '@mui/material/Tooltip/Tooltip';

type Badge = GetAllAndUnlockedBadgesQuery['badges'][number];

interface Props extends Badge {
  isEarned: boolean;
  unlockedDate?: string;
}

export const BadgeCard = ({
  title,
  description,
  course,
  isEarned,
  unlockedDate,
}: Props) => {
  const [anchorElShareButton, setAnchorElShareButton] =
    useState<null | HTMLElement>(null);

  const handleOpenShareMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElShareButton(event.currentTarget);
  };

  const handleCloseShareMenu = () => {
    setAnchorElShareButton(null);
  };

  return (
    <>
      <Card
        sx={{
          pointerEvents: isEarned ? 'auto' : 'none',
          opacity: isEarned ? 1 : 0.6,
          width: '300px',
          height: '300px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          gap: '1rem',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0',
          backgroundColor: 'secondary.dark',
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
            sx={{ fontSize: '1.5rem', color: 'secondary.main' }}
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

      <ShareMenu
        ancherEl={anchorElShareButton}
        onClose={handleCloseShareMenu}
      />
    </>
  );
};
