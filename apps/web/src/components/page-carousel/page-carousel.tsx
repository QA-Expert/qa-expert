import { Button, Paper } from '@mui/material';
import { ReactNode, useState } from 'react';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import { Box } from '../box/box';

interface Props<T> {
  pages?: T[];
  getPage: (page: T) => ReactNode;
}

export function PageCarousel<T>({ pages, getPage }: Props<T>) {
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);

  if (!pages?.length) {
    return null;
  }

  const handleBackwardClick = () => {
    const newIndex =
      currentPageIndex >= 1 ? currentPageIndex - 1 : currentPageIndex;

    setCurrentPageIndex(newIndex);
  };
  const handleForwardClick = () => {
    const newIndex =
      currentPageIndex < pages.length - 1
        ? currentPageIndex + 1
        : currentPageIndex;

    setCurrentPageIndex(newIndex);
  };

  return (
    <Paper
      component={Box}
      sx={{
        height: '100%',
        width: '100%',
        flexDirection: 'row',
      }}
    >
      {pages?.length > 1 && (
        <Button onClick={handleBackwardClick} disabled={currentPageIndex === 0}>
          <ArrowBackIos />
        </Button>
      )}

      {getPage(pages[currentPageIndex])}

      {pages?.length > 1 && (
        <Button
          onClick={handleForwardClick}
          disabled={currentPageIndex === pages.length - 1}
        >
          <ArrowForwardIos />
        </Button>
      )}
    </Paper>
  );
}
