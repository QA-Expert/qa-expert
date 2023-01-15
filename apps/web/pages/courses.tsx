import Layout from '../src/components/layout/layout';
import {
  GET_ALL_COURSES,
  GET_ALL_COURSES_PUBLIC,
} from '../src/graphql/queries/queries';
import { Box } from '../src/components/box/box';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { initializeApollo, APOLLO_STATE_PROP_NAME } from '../apollo/client';
import {
  CourseProgressState,
  GetAllCoursesPublicQuery,
  GetAllCoursesQuery,
} from '../src/__generated__/graphql';
import { useError } from '../utils/hooks';
import { ApolloError, ApolloQueryResult } from '@apollo/client';
import { CardContainer } from '../src/components/card/card';
import { isAuthTokenValid } from '../utils/auth';
import { CompletedCoursesSection } from '../src/components/completed-courses-section/completed-courses-section';
import { Row } from '../src/components/row/row';

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

const CoursesPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const { data, error } = props;
  // TODO: Come up with better way of getting different data set where we don't have to specify type on variable
  const courses: CourseProps[] | undefined =
    data && 'coursesPublic' in data ? data?.coursesPublic : data?.courses;
  const completedCourses = courses?.filter(
    (course) =>
      'progress' in course &&
      course.progress.state === CourseProgressState.Pass,
  );

  useError([error?.message]);

  return (
    <Layout>
      <Box
        sx={{
          justifyContent: 'start',
          gap: '2rem',
          paddingBottom: '2rem',
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

export const getServerSideProps: GetServerSideProps<{
  data?: GetAllCoursesQuery | GetAllCoursesPublicQuery;
  error?: ApolloError;
}> = async (context) => {
  const client = initializeApollo(null, context);
  let response:
    | ApolloQueryResult<GetAllCoursesQuery>
    | ApolloQueryResult<GetAllCoursesPublicQuery>;

  if (
    context.req.headers.cookie &&
    isAuthTokenValid(context.req.headers.cookie)
  ) {
    response = await client.query({
      query: GET_ALL_COURSES,
    });
  } else {
    response = await client.query({
      query: GET_ALL_COURSES_PUBLIC,
    });
  }

  if (response.error) {
    return { props: { error: response.error } };
  } else {
    return {
      props: {
        data: response.data,
        [APOLLO_STATE_PROP_NAME]: client.cache.extract(),
      },
    };
  }
};

export default CoursesPage;
