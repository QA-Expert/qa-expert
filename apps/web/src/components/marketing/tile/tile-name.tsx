import Typography from '@mui/material/Typography';
import { ReactNode } from 'react';

export function TileName({
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
        fontSize: '1.5rem',
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
