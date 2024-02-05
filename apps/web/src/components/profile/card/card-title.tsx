import Typography from '@mui/material/Typography/Typography';
import { ReactNode } from 'react';

export function CardTitle({ children }: { children: ReactNode }) {
  return (
    <Typography
      variant="h4"
      sx={{
        color: 'secondary.main',
        fontSize: '1rem',
        textTransform: 'uppercase',
      }}
    >
      {children}
    </Typography>
  );
}
