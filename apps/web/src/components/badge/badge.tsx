import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { GetBadgesQuery } from '../../__generated__/graphql';
import VerifiedIcon from '@mui/icons-material/Verified';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';

type Badge = GetBadgesQuery['badges'][number];
interface Props extends Badge {
  isEarned: boolean;
}

export const BadgeComponent = ({
  title,
  description,
  course,
  isEarned,
}: Props) => {
  return (
    <Card
      variant="outlined"
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
      }}
    >
      <CardMedia>
        <VerifiedIcon fontSize="large" />
      </CardMedia>
      <CardContent>
        <Typography variant="h3" sx={{ fontSize: '1rem' }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      {course && (
        <CardActions>
          <Button href={`/course/${course?._id}`} size="small">
            Go to Course
          </Button>
        </CardActions>
      )}
    </Card>
  );
};
