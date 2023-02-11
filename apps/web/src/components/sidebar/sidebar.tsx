import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { MouseEvent as MouseEventReact, useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box } from '../box/box';
import { styled, useTheme } from '@mui/material/styles';
import { Row } from '../row/row';
import { debounce } from 'lodash';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import { GetCourseQuery } from '../../__generated__/graphql';
import { NavigationCard } from './navigation-card';

type Props = {
  description: string;
  courseInfo: GetCourseQuery['course'];
};

type ToggleValue = 'description' | 'navigation';

export const INIT_WIDTH = 320;

export default function Sidebar({ description, courseInfo }: Props) {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [width, setWidth] = useState(INIT_WIDTH);
  const [toggleValue, setToggleValue] = useState<ToggleValue>('description');

  const handleToggleChange = (
    _event: MouseEventReact<HTMLElement, MouseEvent>,
    toggleValue: ToggleValue,
  ) => {
    if (toggleValue !== null) {
      setToggleValue(toggleValue);
    }
  };

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
          aria-label="side bar content"
          sx={{
            flex: '1',
            overflow: 'hidden',
            height: '100%',
            justifyContent: 'start',
            padding: isOpen ? '1rem' : 0,
          }}
        >
          <Row sx={{ justifyContent: 'center', width }}>
            <ToggleButtonGroup
              size="small"
              exclusive
              onChange={handleToggleChange}
              aria-label="Navigation or Description toggle"
              value={toggleValue}
            >
              <ToggleButton value="description">Description</ToggleButton>
              <ToggleButton value="navigation">Navigation</ToggleButton>
            </ToggleButtonGroup>
          </Row>

          {toggleValue === 'description' ? (
            <Row>{description}</Row>
          ) : (
            <NavigationCard {...courseInfo} />
          )}
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
