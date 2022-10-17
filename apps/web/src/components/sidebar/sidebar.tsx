import { IconButton, Paper } from '@mui/material';
import { ReactNode, useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box } from '../box/box';
type Props = {
  children: ReactNode;
};

export default function Sidebar({ children }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setIsOpen(isOpen ? false : true);
  };

  return (
    <Paper
      sx={{
        width: isOpen ? '25%' : '2.5rem',
        marginRight: 'auto',
        height: '100%',
        transition: 'width 0.5s',
        borderRadius: 0,
      }}
    >
      <Box
        sx={{
          flexDirection: 'row',
          flex: '1',
          height: '100%',
        }}
      >
        <Box
          sx={{
            flex: '1',
            overflow: 'hidden',
            height: '100%',
            justifyContent: 'start',
          }}
        >
          {children}
        </Box>
        <Box
          sx={{
            height: '100%',
          }}
        >
          <IconButton component="button" onClick={handleOpen}>
            {isOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
}
