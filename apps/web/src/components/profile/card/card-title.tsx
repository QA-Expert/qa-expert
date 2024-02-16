import Typography from '@mui/material/Typography/Typography';
import { ReactNode } from 'react';

export function CardTitle({
  children,
  color,
}: {
  children: ReactNode;
  color?: string;
}) {
  return (
    <Typography
      variant="h4"
      sx={{
        color: color ?? 'secondary.main',
        fontSize: '1rem',
        textTransform: 'uppercase',
        fontWeight: 'bold',
      }}
    >
      {children}
    </Typography>
  );
}
