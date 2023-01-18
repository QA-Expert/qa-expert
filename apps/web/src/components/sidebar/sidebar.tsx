import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { MouseEvent as MouseEventReact, ReactNode, useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box } from '../box/box';
import { styled, useTheme } from '@mui/material/styles';
import { Row } from '../row/row';
import { debounce } from 'lodash';
type Props = {
  children: ReactNode;
};

export default function Sidebar({ children }: Props) {
  const INIT_WIDTH = 320;
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [width, setWidth] = useState(INIT_WIDTH);

  const handler = (mouseDownEvent: MouseEventReact<HTMLButtonElement>) => {
    const startWidth = width;
    const startPosition = mouseDownEvent.pageX;

    const onMouseMove = (e: MouseEvent) => {
      const resize = debounce(
        () => setWidth(() => startWidth - startPosition + e.pageX),
        300,
      );

      return resize();
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp, { once: true });
  };

  const handleOpen = () => {
    setIsOpen(isOpen ? false : true);

    if (!isOpen) {
      setWidth(INIT_WIDTH);
    }
  };

  return (
    <Paper
      sx={{
        width: isOpen ? width : '2.75rem',
        marginRight: 'auto',
        height: '100%',
        transition: 'width 0.5s',
        position: 'relative',
        zIndex: 'speedDial',
        // TODO: Find better solution for mobile view
        // Add sticking to top when scrolled down
        [theme.breakpoints.down('md')]: {
          width: isOpen ? width : '2.75rem',
          height: isOpen ? 'auto' : '2.75rem',
          position: 'absolute',
          zIndex: 'speedDial',
          left: '0.5rem',
          top: '0.5rem',
          transition: 'height 0.5s, width 0.5s',
        },
      }}
    >
      <Row
        sx={{
          flex: '1',
          height: '100%',
          gap: '0.75rem',
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

        <Row
          sx={{
            gap: 0,
            width: 'auto',
            height: '100%',
          }}
        >
          <IconButton
            sx={{ padding: 0 }}
            component="button"
            onClick={handleOpen}
          >
            {isOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>

          <Resizer
            type="button"
            onMouseDown={handler}
            sx={{
              height: '100%',
            }}
          />
        </Row>
      </Row>
    </Paper>
  );
}

const Resizer = styled('button')(() => ({
  height: '100%',
  cursor: 'ew-resize',
  backgroundColor: 'inherit',
  border: 'none',
  padding: '0.25rem',
}));
