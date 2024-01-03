'use client';

import { Box } from '../../../src/components/box/box';
import Layout from '../../../src/components/layout/layout';
import { Pages } from '../../../src/components/pages/pages';
import { Row } from '../../../src/components/row/row';
import { GET_COURSE } from '../../../src/graphql/queries/queries';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { useParams } from 'next/navigation';

/**
 * @description Routing App component that represents a root for a Course
 */
const Course = () => {
  const params = useParams();
  const { data } = useSuspenseQuery(GET_COURSE, {
    variables: { _id: params.id as string },
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
