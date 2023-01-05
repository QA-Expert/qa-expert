import MuiBox from '@mui/material/Box';
import { BoxProps } from '@mui/material';

export const Box = (props: BoxProps) => {
  return (
    <MuiBox
      {...props}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    />
  );
};
