'use client';

import { useState } from 'react';
import { Box } from '@/components/box/box';
import { Row } from '@/components/row/row';
import Sidebar from '@/components/sidebar/sidebar';
import {
  CourseType,
  GetCourseQuery,
  QuestionType,
} from '__generated__/graphql';
import Page from '@/components/page/page';
import { PagePagination } from '@/components/pages/pages-pagination';
import { TestAppSection } from '@/components/test-app-section/test-app-section';
import { Section } from '@/components/section/section';
import { Navigation } from '@/components/pages/navigation/navigation';
import { RestApiResponseSection } from '@/components/test-app-section/rest-api-response-section';

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

      {currentPage.type === CourseType.Quiz &&
      currentPage.question?.type !== QuestionType.RestApi ? (
        <TestAppSection />
      ) : null}

      {currentPage.type === CourseType.Quiz &&
      currentPage.question?.type === QuestionType.RestApi ? (
        <RestApiResponseSection />
      ) : null}
    </Row>
  );
}
