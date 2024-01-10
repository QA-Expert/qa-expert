import Card from '@mui/material/Card/Card';
import Typography from '@mui/material/Typography/Typography';
import { GetUserActivitiesQuery } from '__generated__/graphql';

type Props = Pick<
  GetUserActivitiesQuery['activities'][number],
  'description' | 'title' | 'value'
>;

export function ActivityCard({ title, description, value }: Props) {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'secondary.dark',
        padding: '1rem',
        gap: '1rem',
        minWidth: '510px',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: 'secondary.main',
          fontSize: '1rem',
          textTransform: 'uppercase',
        }}
      >
        {title}
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
        {description}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: 'secondary.main',
          fontSize: '2rem',
          alignSelf: 'flex-end',
        }}
      >
        {value}
      </Typography>
    </Card>
  );
}
