import Layout from '../src/components/layout/layout';
import {
  GET_ALL_COURSES,
  GET_ALL_COURSES_PUBLIC,
} from '../src/graphql/queries/queries';
import Typography from '@mui/material/Typography';
import { CardContainer } from '../src/components/card';
import { Box } from '../src/components/box/box';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { initializeApollo, APOLLO_STATE_PROP_NAME } from '../apollo/client';
import {
  GetAllCoursesPublicQuery,
  GetAllCoursesQuery,
} from '../src/__generated__/graphql';
import { useError } from '../utils/hooks';
import { ApolloError, ApolloQueryResult } from '@apollo/client';
import { CardComponent } from '../src/components/card/card';
import { isAuthTokenValid } from '../utils/auth';

const CoursesPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const { data, error } = props;

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
        <Typography variant="h2" sx={{ fontSize: '3rem' }}>
          Courses
        </Typography>

        <Box
          sx={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: '2rem',
            flexWrap: 'wrap',
          }}
        >
          {data &&
            'courses' in data &&
            data?.courses?.map((course) => (
              <CardContainer key={course._id} {...course} />
            ))}

          {data &&
            'coursesPublic' in data &&
            data?.coursesPublic?.map((course) => (
              <CardComponent key={course._id} {...course} />
            ))}
        </Box>
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
