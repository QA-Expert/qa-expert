import Typography from '@mui/material/Typography';
import { ReactNode } from 'react';

export function CardName({ children }: { children: ReactNode }) {
  return (
    <Typography
      sx={{
        textAlign: 'center',
        fontSize: '1.5rem',
        textTransform: 'uppercase',
        paddingLeft: '1rem',
        paddingRight: '1rem',
      }}
      variant="h3"
    >
      {children}
    </Typography>
  );
}
