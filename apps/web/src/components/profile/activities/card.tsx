import { Card } from '@/components/profile/card/card';
import Typography from '@mui/material/Typography/Typography';
import { GetUserActivitiesQuery } from '__generated__/graphql';
import { CardTitle } from '@/components/profile/card/card-title';

type Props = Pick<
  GetUserActivitiesQuery['activities'][number],
  'description' | 'title' | 'value'
>;

export function ActivityCard({ title, description, value }: Props) {
  return (
    <Card
      sx={{
        minWidth: '510px',
      }}
    >
      <CardTitle>{title}</CardTitle>

      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
        {description}
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: 'secondary.main',
          fontSize: '2rem',
          alignSelf: 'flex-end',
          fontWeight: 'bold',
        }}
      >
        {value}
      </Typography>
    </Card>
  );
}
