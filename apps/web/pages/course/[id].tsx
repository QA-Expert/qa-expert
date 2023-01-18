import { ApolloError, useQuery } from '@apollo/client';
import Typography from '@mui/material/Typography';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { APOLLO_STATE_PROP_NAME, initializeApollo } from '../../apollo/client';
import { Box } from '../../src/components/box/box';
import Layout from '../../src/components/layout/layout';
import { PageCarousel } from '../../src/components/page-carousel/page-carousel';
import Page from '../../src/components/page/page';
import { Row } from '../../src/components/row/row';
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
      {data ? (
        <Row
          sx={{
            width: '100%',
            height: '100%',
            flex: 1,
            padding: '1rem',
            gap: '1rem',
            borderRadius: 0,
            position: 'relative',
          }}
        >
          <Sidebar>
            {`Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum`}
          </Sidebar>

          <Box
            sx={{
              height: '100%',
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
        </Row>
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
