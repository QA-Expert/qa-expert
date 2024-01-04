import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { MouseEvent as MouseEventReact, ReactNode, useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box } from '@/components/box/box';
import { styled } from '@mui/material/styles';
import { Row } from '@/components/row/row';
import { debounce } from 'lodash';

export const INIT_WIDTH = 320;

export default function Sidebar({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [width, setWidth] = useState(INIT_WIDTH);

  const handlerResizer = (
    mouseDownEvent: MouseEventReact<HTMLButtonElement>,
  ) => {
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
        width: isOpen ? 'auto' : '2.75rem',
        marginRight: 'auto',
        height: '100%',
        transition: 'width 0.5s',
        position: 'relative',
        zIndex: 'speedDial',
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
          aria-label="side bar content"
          sx={{
            flex: '1',
            overflow: 'hidden',
            height: '100%',
            justifyContent: 'start',
            padding: isOpen ? '1rem' : 0,
            gap: '1rem',
          }}
        >
          {isOpen ? children : null}
        </Box>

        <Row
          aria-label="expand side bar button"
          aria-expanded={isOpen}
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
            onMouseDown={handlerResizer}
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
