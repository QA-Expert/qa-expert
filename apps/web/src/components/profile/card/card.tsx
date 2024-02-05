import { CardProps } from '@mui/material/Card/Card';
import MuiCard from '@mui/material/Card';

export function Card(props: CardProps) {
  return (
    <MuiCard
      {...props}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'secondary.dark',
        padding: '1rem',
        gap: '1rem',
        ...props.sx,
      }}
    >
      {props.children}
    </MuiCard>
  );
}
