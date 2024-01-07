'use client';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Iframe from 'react-iframe';

export type Props = {
  title: string;
  description: string;
  videoId: string;
};

export function ExampleCard({ title, description, videoId }: Props) {
  return (
    <Card
      sx={{
        width: '560px',
        background: 'none',
        border: 'none',
        boxShadow: 'none',
        padding: 0,
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          border: 'none',
          gap: '0.5rem',
          padding: 0,
        }}
      >
        <Iframe
          url={`https://www.youtube.com/embed/${videoId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={`Embedded youtube about ${title}`}
          display="block"
          frameBorder={0}
          position="relative"
          styles={{
            aspectRatio: '16 / 9',
            height: 'auto',
            width: '100%',
          }}
        />
        <Typography
          sx={{
            fontSize: '1.5rem',
          }}
          variant="h3"
        >
          {title}
        </Typography>
        <Typography textAlign="left" variant="body1">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
