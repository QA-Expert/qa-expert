import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Badge } from 'graphql-schema-gen/schema.gen';
import VerifiedIcon from '@mui/icons-material/Verified';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';

export const BadgeComponent = ({ title, description, course }: Badge) => {
  return (
    <Card
      variant="outlined"
      sx={{
        minWidth: '3rem',
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
      <CardActions>
        <Button href={`/course/${course?._id}`} size="small">
          Go to Course
        </Button>
      </CardActions>
    </Card>
  );
};
