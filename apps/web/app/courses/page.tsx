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
import { useError } from '../../utils/hooks';
import { CardContainer } from '../../src/components/card/card';
import { isAuthTokenValid } from '../../utils/auth';
import { CompletedCoursesSection } from '../../src/components/completed-courses-section/completed-courses-section';
import { Row } from '../../src/components/row/row';
import { getClient } from '../../apollo/ssr_client';
import { headers } from 'next/headers';

export type LoggedInUserCourses = Pick<
  GetAllCoursesQuery['courses'][number],
  | '_id'
  | 'title'
  | 'description'
  | 'pages'
  | 'progress'
  | 'recommendedCourses'
  | 'level'
>;

export type PublicCourses = Pick<
  GetAllCoursesPublicQuery['coursesPublic'][number],
  '_id' | 'title' | 'description' | 'pages' | 'recommendedCourses' | 'level'
>;

export type CourseProps = LoggedInUserCourses | PublicCourses;

const CoursesPage = async () => {
  // TODO: Come up with better way of getting different data set where we don't have to specify type on variable
  const token = headers().get('Cookie');

  const isTokenValid = token && isAuthTokenValid(token);

  const { data } = await getClient().query<
    GetAllCoursesQuery | GetAllCoursesPublicQuery
  >({
    query: isTokenValid ? GET_ALL_COURSES : GET_ALL_COURSES_PUBLIC,
  });

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
};

export default CoursesPage;
