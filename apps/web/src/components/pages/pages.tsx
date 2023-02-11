import { useState } from 'react';
import { Box } from '../box/box';
import Paper from '@mui/material/Paper';
import { Row } from '../row/row';
import Sidebar from '../sidebar/sidebar';
import {
  GetCourseQuery,
  PageFragmentFragmentDoc,
} from '../../__generated__/graphql';
import { FragmentType, useFragment } from '../../__generated__';
import Page from '../page/page';
import { PagePagination } from './pages-pagination';

interface Props {
  pages: FragmentType<typeof PageFragmentFragmentDoc>[];
  courseInfo: GetCourseQuery['course'];
}

export function Pages({ pages, courseInfo }: Props) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const currentPageFragment = useFragment(
    PageFragmentFragmentDoc,
    pages[currentPageIndex],
  );

  if (!pages?.length) {
    return null;
  }

  return (
    <Row
      sx={{
        height: '100%',
        width: '100%',
        flexDirection: 'row',
        gap: '1rem',
      }}
    >
      <Sidebar
        description={currentPageFragment.description}
        courseInfo={courseInfo}
      />

      <Paper
        component={Row}
        sx={{
          height: '100%',
        }}
      >
        <Box
          sx={{ gap: '1rem', height: '100%', width: '100%', padding: '2rem' }}
        >
          <Page {...pages[currentPageIndex]} />

          <PagePagination
            onPageChange={setCurrentPageIndex}
            totalNumberOfPages={pages.length}
            currentPageIndex={currentPageIndex}
          />
        </Box>
      </Paper>
    </Row>
  );
}
