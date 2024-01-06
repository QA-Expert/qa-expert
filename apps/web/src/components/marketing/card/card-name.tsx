import Typography from '@mui/material/Typography';
import { ReactNode } from 'react';

export function CardName({
  children,
  selected,
}: {
  children: ReactNode;
  selected?: boolean;
}) {
  return (
    <Typography
      sx={{
        textAlign: 'center',
        fontSize: selected ? '1.5rem' : '1rem',
        color: selected ? 'text.primary' : 'secondary.main',
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
