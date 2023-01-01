import Layout from '../src/components/layout/layout';
import { GET_ALL_COURSES } from '../src/graphql/queries/queries';
import Typography from '@mui/material/Typography';
import { CardComponent } from '../src/components/card/card';
import { Box } from '../src/components/box/box';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { initializeApollo, APOLLO_STATE_PROP_NAME } from '../apollo/client';
import { GetAllCoursesQuery } from '../src/__generated__/graphql';
import { useError } from '../utils/hooks';
import { ApolloError } from '@apollo/client';

const HomePage = (
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
          {data?.courses.map((course) => (
            <CardComponent key={course._id} {...course} />
          ))}
        </Box>
      </Box>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<{
  data?: GetAllCoursesQuery;
  error?: ApolloError;
}> = async (context) => {
  const client = initializeApollo(null, context);
  const { data, error } = await client.query({
    query: GET_ALL_COURSES,
  });

  if (error) {
    return { props: { error } };
  } else {
    return {
      props: { data, [APOLLO_STATE_PROP_NAME]: client.cache.extract() },
    };
  }
};

export default HomePage;
