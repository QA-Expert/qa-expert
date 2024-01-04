import Paper from '@mui/material/Paper/Paper';
import { PaperProps } from '@mui/material';

export function Section(props: PaperProps) {
  return (
    <Paper
      {...props}
      component="section"
      sx={{
        ...props.sx,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        height: '100%',
        width: '100%',
        alignItems: 'center',
      }}
    />
  );
}
