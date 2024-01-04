'use client';

import { useState } from 'react';
import { Box } from '../box/box';
import Paper from '@mui/material/Paper';
import { Row } from '../row/row';
import Sidebar from '../sidebar/sidebar';
import { CourseType, GetCourseQuery } from '../../__generated__/graphql';
import Page from '../page/page';
import { PagePagination } from './pages-pagination';
import { TestAppSection } from '../test-app-section/test-app-section';
import { Section } from '../section/section';
import { Navigation } from './navigation';

interface Props {
  pages: GetCourseQuery['course']['pages'];
  courseInfo: GetCourseQuery['course'];
}

/**
 * @description Container that represents a collection of pages inside of the Course.
 */
export function Pages({ pages, courseInfo }: Props) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const currentPage = pages[currentPageIndex];
  if (!currentPage) {
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
      <Sidebar>
        <Navigation
          description={currentPage.description ?? ''}
          courseInfo={courseInfo}
          onPageChange={setCurrentPageIndex}
          currentPageIndex={currentPageIndex}
        />
      </Sidebar>

      <Section sx={{ flex: 1 }}>
        <Box
          sx={{
            gap: '1rem',
            width: '100%',
            padding: '2rem',
          }}
        >
          <Page {...currentPage} />

          <PagePagination
            onPageChange={setCurrentPageIndex}
            totalNumberOfPages={pages.length}
            currentPageIndex={currentPageIndex}
          />
        </Box>
      </Section>

      {currentPage.type === CourseType.Quiz ? <TestAppSection /> : null}
    </Row>
  );
}
