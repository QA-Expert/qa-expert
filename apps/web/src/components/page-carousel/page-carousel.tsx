import Button from '@mui/material/Button';
import { ReactNode, useState } from 'react';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import { Box } from '../box/box';

interface Props {
  children: ReactNode[];
}

export function PageCarousel({ children }: Props) {
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);

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

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        flexDirection: 'row',
      }}
    >
      {children?.length > 1 && (
        <Button onClick={handleBackwardClick} disabled={currentPageIndex === 0}>
          <ArrowBackIos />
        </Button>
      )}

      {children[currentPageIndex]}

      {children?.length > 1 && (
        <Button
          onClick={handleForwardClick}
          disabled={currentPageIndex === children.length - 1}
        >
          <ArrowForwardIos />
        </Button>
      )}
    </Box>
  );
}
