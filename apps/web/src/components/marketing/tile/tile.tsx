import { CardProps } from '@mui/material';
import Card from '@mui/material/Card';

export function Tile(props: CardProps) {
  return (
    <Card
      {...props}
      variant="outlined"
      sx={{ borderColor: 'secondary.main', ...props.sx }}
    >
      {props.children}
    </Card>
  );
}
