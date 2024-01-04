import { Row } from '@/components/row/row';
import Pagination from '@mui/material/Pagination';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNew from '@mui/icons-material/ArrowBackIosNew';
import IconButton from '@mui/material/IconButton';

type Props = {
  onPageChange: (currentIndex: number) => void;
  totalNumberOfPages: number;
  currentPageIndex: number;
};

export function PagePagination({
  onPageChange,
  totalNumberOfPages,
  currentPageIndex,
}: Props) {
  const handleBackwardClick = () => {
    const newIndex =
      currentPageIndex >= 1 ? currentPageIndex - 1 : currentPageIndex;

    onPageChange(newIndex);
  };
  const handleForwardClick = () => {
    const newIndex =
      currentPageIndex < totalNumberOfPages - 1
        ? currentPageIndex + 1
        : currentPageIndex;

    onPageChange(newIndex);
  };

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    // MUI pagination passes pages position not an index
    onPageChange(value - 1);
  };

  return (
    <Row sx={{ justifyContent: 'center' }}>
      {totalNumberOfPages > 1 && (
        <IconButton
          onClick={handleBackwardClick}
          disabled={currentPageIndex === 0}
        >
          <ArrowBackIosNew />
        </IconButton>
      )}

      {totalNumberOfPages && (
        <Pagination
          shape="circular"
          // MUI pagination takes pages position not an index
          page={currentPageIndex + 1}
          onChange={handleChange}
          count={totalNumberOfPages}
        />
      )}

      {totalNumberOfPages > 1 && (
        <IconButton
          onClick={handleForwardClick}
          disabled={currentPageIndex === totalNumberOfPages - 1}
        >
          <ArrowForwardIos />
        </IconButton>
      )}
    </Row>
  );
}
