import MuiBox from '@mui/material/Box';
import { BoxProps } from '@mui/material';

export function Row(props: BoxProps) {
  return (
    <MuiBox
      {...props}
      display="flex"
      justifyContent="start"
      alignItems="center"
      width="100%"
      gap="0.5rem"
    />
  );
}
