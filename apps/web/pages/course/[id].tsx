import { ApolloError } from '@apollo/client';
import Typography from '@mui/material/Typography';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { initializeApollo } from '../../appolo/client';
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
  const { data, error } = props;

  useError([error?.message]);

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

  const { data, error } = await initializeApollo(null, context).query({
    query: GET_COURSE,
    variables: { _id: id },
  });

  if (error) {
    return { props: { error } };
  } else {
    return { props: { data } };
  }
};

export default Course;
