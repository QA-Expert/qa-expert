import Typography from '@mui/material/Typography/Typography';
import { TypographyProps } from '@mui/material';

export function SectionTitle(props: TypographyProps) {
  return (
    <Typography
      variant="h2"
      sx={{
        fontSize: '2rem',
        textTransform: 'uppercase',
        color: 'secondary.main',
        fontWeight: 'bold',
      }}
    >
      {props.children}
    </Typography>
  );
}
