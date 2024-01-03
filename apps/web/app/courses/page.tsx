'use client';

import Layout from '../../src/components/layout/layout';
import {
  GET_ALL_COURSES,
  GET_ALL_COURSES_PUBLIC,
} from '../../src/graphql/queries/queries';
import { Box } from '../../src/components/box/box';
import {
  CourseProgressState,
  GetAllCoursesPublicQuery,
  GetAllCoursesQuery,
} from '../../src/__generated__/graphql';
import { CardContainer } from '../../src/components/card/card';
import { CompletedCoursesSection } from '../../src/components/completed-courses-section/completed-courses-section';
import { Row } from '../../src/components/row/row';
import { isAuthenticated } from '../../apollo/store';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { useReactiveVar } from '@apollo/client';
import { useEffect } from 'react';

export type LoggedInUserCourses = GetAllCoursesQuery['courses'][number];

export type PublicCourses = Pick<
  GetAllCoursesPublicQuery['coursesPublic'][number],
  '_id' | 'title' | 'description' | 'pages' | 'recommendedCourses' | 'level'
>;

export type CourseProps = LoggedInUserCourses | PublicCourses;

/**
 * @description Routing App component that represents gallery of the Courses.
 *
 * NOTE: Courses page is purposely client component as we need to re-render it based on user auth state.
 */
function CoursesPage() {
  // TODO: Come up with better way of getting different data set where we don't have to specify type on variable
  const isUserAuthenticated = useReactiveVar(isAuthenticated);
  const { data } = useQuery<GetAllCoursesQuery | GetAllCoursesPublicQuery>(
    isUserAuthenticated ? GET_ALL_COURSES : GET_ALL_COURSES_PUBLIC,
  );

  const courses: CourseProps[] | undefined =
    data && 'coursesPublic' in data ? data?.coursesPublic : data?.courses;

  const completedCourses = courses?.filter(
    (course) =>
      'progress' in course &&
      course.progress.state === CourseProgressState.Pass,
  );

  return (
    <Layout>
      <Box
        sx={{
          gap: '2rem',
          padding: '2rem',
        }}
      >
        {completedCourses?.length ? (
          <CompletedCoursesSection courses={completedCourses} />
        ) : null}

        <Row
          sx={{
            justifyContent: 'center',
            alignItems: 'flex-start',
            gap: '2rem',
            flexWrap: 'wrap',
          }}
        >
          {courses?.map((course) => (
            <CardContainer key={course._id} {...course} />
          ))}
        </Row>
      </Box>
    </Layout>
  );
}

export default CoursesPage;
