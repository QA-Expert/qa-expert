import MuiDivider from '@mui/material/Divider/Divider';
import { ReactNode } from 'react';

export function Divider({
  color,
  children,
}: {
  color?: string;
  children?: ReactNode;
}) {
  return (
    <MuiDivider
      variant="fullWidth"
      flexItem
      sx={{
        color: color ?? 'secondary.main',
        '&::before, &::after': { backgroundColor: color ?? 'secondary.main' },
      }}
    >
      {children}
    </MuiDivider>
  );
}
