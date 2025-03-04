'use client';

import { useEffect, useState } from 'react';
import { Box } from '@/components/box/box';
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
import { FeedbackModal } from '../feedback/modal';

interface Props {
  pages: GetCourseQuery['course']['pages'];
  courseInfo: GetCourseQuery['course'];
}

/**
 * @description Container that represents a collection of pages inside of the Course.
 */
export function Pages({ pages, courseInfo }: Props) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const currentPage = pages[currentPageIndex];

  const handleOnSubmit = () => {
    if (courseInfo.progress.pagesLeftBeforeFinish === 1) {
      setIsFeedbackModalOpen(true);
    }
  };

  useEffect(() => {
    if (global.window?.location.hash) {
      setCurrentPageIndex(
        // we do decrement as hash has value of page number not index
        Number(global.window?.location.hash.replace('#', '')) - 1 ?? 0,
      );
    }
  }, []);

  if (!currentPage) {
    return null;
  }

  return (
    <>
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
          <Page page={{ ...currentPage }} onSubmit={handleOnSubmit} />

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

      <FeedbackModal
        title="How did you like the course?"
        onClose={() => setIsFeedbackModalOpen(false)}
        isOpen={isFeedbackModalOpen}
        objectInfo={{
          name: 'course',
          id: courseInfo._id,
        }}
      />
    </>
  );
}
