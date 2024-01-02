import { Box } from '../../../src/components/box/box';
import Layout from '../../../src/components/layout/layout';
import { Pages } from '../../../src/components/pages/pages';
import { Row } from '../../../src/components/row/row';
import { GET_COURSE } from '../../../src/graphql/queries/queries';
import { getClient } from '../../../apollo/ssr_client';

const Course = async ({ params }: { params: { id: string } }) => {
  const { data } = await getClient().query({
    variables: { _id: params.id },
    query: GET_COURSE,
  });

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
          <Box
            sx={{
              height: '100%',
              width: '100%',
              flexGrow: 1,
            }}
          >
            <Pages pages={data.course.pages} courseInfo={data.course} />
          </Box>
        </Row>
      ) : null}
    </Layout>
  );
};

export default Course;
