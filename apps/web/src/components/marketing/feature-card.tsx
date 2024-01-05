'use client';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';

export type Props = {
  title: string;
  description: string;
};

export function FeatureCard({ title, description }: Props) {
  return (
    <Card
      variant="outlined"
      sx={{ width: '260px', height: '260px', borderColor: 'secondary.main' }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem',
        }}
      >
        <TipsAndUpdatesOutlinedIcon
          color="secondary"
          sx={{
            width: '3rem',
            height: '3rem',
          }}
        />
        <Typography
          sx={{
            textAlign: 'center',
            fontSize: '1.5rem',
          }}
          variant="h3"
        >
          {title}
        </Typography>
        <Typography textAlign="center" variant="body1">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
