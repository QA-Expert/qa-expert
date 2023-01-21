import { ApolloError, useQuery } from '@apollo/client';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { APOLLO_STATE_PROP_NAME, initializeApollo } from '../../apollo/client';
import { Box } from '../../src/components/box/box';
import Layout from '../../src/components/layout/layout';
import { PageCarousel } from '../../src/components/page-carousel/page-carousel';
import Page from '../../src/components/page/page';
import Sidebar from '../../src/components/sidebar/sidebar';
import { GET_COURSE } from '../../src/graphql/queries/queries';
import { GetCourseQuery } from '../../src/__generated__/graphql';
import { useError } from '../../utils/hooks';

const Course = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const { error } = props;
  const router = useRouter();
  // NOTE: we use query to refetch course from cache in case if course data got changed dynamically
  // But we don't refetch course from network first time we visit page as it is fetched already and put in cache
  const { data, error: queryError } = useQuery(GET_COURSE, {
    variables: { _id: router.query.id as string },
  });

  useError([error?.message, queryError?.message]);

  return (
    <Layout>
      <Sidebar>Test</Sidebar>
      {data ? (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            flex: 1,
            padding: '1rem',
            gap: '1rem',
            borderRadius: 0,
          }}
        >
          <Box
            sx={{
              width: '100%',
              gap: '1rem',
            }}
          >
            <Typography variant="h2" sx={{ fontSize: '1.5rem' }}>
              {data.course.title}
            </Typography>
            <Typography variant="h3" sx={{ fontSize: '1rem' }}>
              {data.course.description}
            </Typography>
          </Box>

          <Box
            sx={{
              width: '100%',
              flexGrow: 1,
            }}
          >
            <PageCarousel>
              {data.course.pages.map((page, i) => (
                <Page key={i} {...page} />
              ))}
            </PageCarousel>
          </Box>
        </Box>
      ) : null}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<{
  data?: GetCourseQuery;
  error?: ApolloError;
}> = async (context) => {
  const { id } = context.params as { id: string };
  const client = initializeApollo(null, context);
  const { data, error } = await client.query({
    query: GET_COURSE,
    variables: { _id: id },
  });

  if (error) {
    return { props: { error } };
  } else {
    return {
      props: { data, [APOLLO_STATE_PROP_NAME]: client.cache.extract() },
    };
  }
};

export default Course;
