import { CardContentProps } from '@mui/material';
import CardContent from '@mui/material/CardContent';

export function TileComponent(props: CardContentProps) {
  return (
    <CardContent
      {...props}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem',
        '&:last-child': {
          padding: '1rem',
        },
        ...props.sx,
      }}
    >
      {props.children}
    </CardContent>
  );
}
