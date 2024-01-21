import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { GetAllAndUnlockedBadgesQuery } from '__generated__/graphql';
import VerifiedIcon from '@mui/icons-material/Verified';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';

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
  return (
    <Card
      sx={{
        pointerEvents: isEarned ? 'auto' : 'none',
        opacity: isEarned ? 1 : 0.6,
        width: '200px',
        height: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '1rem',
        backgroundColor: 'secondary.dark',
      }}
    >
      <CardMedia>
        <VerifiedIcon fontSize="large" />
      </CardMedia>
      <CardContent>
        <Typography variant="h3" sx={{ fontSize: '1rem' }}>
          {title} - {unlockedDate ? new Date(unlockedDate).toString() : ''}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      {course && (
        <CardActions>
          <Button
            sx={{ padding: '0.5rem' }}
            href={`/course/${course?._id}`}
            size="small"
          >
            Go to Course
          </Button>
        </CardActions>
      )}
    </Card>
  );
};
