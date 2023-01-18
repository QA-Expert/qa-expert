import IconButton from '@mui/material/IconButton';
import { ReactNode, useState } from 'react';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import { Box } from '../box/box';
import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import { Row } from '../row/row';

interface Props {
  children: ReactNode[];
}

export function PageCarousel({ children }: Props) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  if (!children?.length) {
    return null;
  }

  const handleBackwardClick = () => {
    const newIndex =
      currentPageIndex >= 1 ? currentPageIndex - 1 : currentPageIndex;

    setCurrentPageIndex(newIndex);
  };
  const handleForwardClick = () => {
    const newIndex =
      currentPageIndex < children.length - 1
        ? currentPageIndex + 1
        : currentPageIndex;

    setCurrentPageIndex(newIndex);
  };

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    // MUI pagination passes pages position not an index
    setCurrentPageIndex(value - 1);
  };

  return (
    <Paper
      component={Row}
      sx={{
        height: '100%',
        width: '100%',
        flexDirection: 'row',
      }}
    >
      <Box sx={{ gap: '1rem', height: '100%', width: '100%', padding: '2rem' }}>
        {/* Current page itself */}
        {children[currentPageIndex]}

        <Row sx={{ justifyContent: 'center' }}>
          {children?.length > 1 && (
            <IconButton
              onClick={handleBackwardClick}
              disabled={currentPageIndex === 0}
            >
              <ArrowBackIos />
            </IconButton>
          )}

          {children.length && (
            <Pagination
              shape="circular"
              // MUI pagination takes pages position not an index
              page={currentPageIndex + 1}
              onChange={handleChange}
              count={children.length}
            />
          )}

          {children?.length > 1 && (
            <IconButton
              onClick={handleForwardClick}
              disabled={currentPageIndex === children.length - 1}
            >
              <ArrowForwardIos />
            </IconButton>
          )}
        </Row>
      </Box>
    </Paper>
  );
}
