import MuiBox from '@mui/material/Box';
import { BoxProps } from '@mui/material';

export function Box(props: BoxProps) {
  return (
    <MuiBox
      {...props}
      display="flex"
      flexDirection="column"
      gap={'0.5rem'}
      justifyContent="center"
      alignItems="center"
    />
  );
}
