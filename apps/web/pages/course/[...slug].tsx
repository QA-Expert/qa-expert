import { useQuery } from '@apollo/client';
import { Box } from '@mui/material';
import {
  Course as CourseType,
  CoursePage as CoursePageType,
} from 'graphql-schema-gen/schema.gen';
import { useRouter } from 'next/router';
import CoursePage from '../../src/components/course-page/course-page';
import Layout from '../../src/components/layout/layout';
import { PageCarousel } from '../../src/components/page-carousel/page-carousel';
import Sidebar from '../../src/components/sidebar/sidebar';
import { GET_COURSE } from '../../src/graphql/queries/queries';

const Course = () => {
  const route = useRouter();
  const slug = route.query.slug ? route.query.slug[0] : null;

  const { loading, data, error } = useQuery<{
    course: CourseType;
  }>(GET_COURSE, {
    variables: { courseId: slug },
    skip: !slug,
  });

  /* TODO: Add TOASTS */
  if (error) {
    return null;
  }

  if (!data) {
    return null;
  }
  return (
    <Layout>
      <Sidebar>Test</Sidebar>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          flex: 1,
          padding: '2rem',
        }}
      >
        {/* TODO: Add Loading indicator */}
        {loading && <p>..... LOADING ......</p>}

        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <h1>{data.course.title}</h1>
          <h2>{data.course.description}</h2>
          <span>{data.course.icon}</span>
        </Box>

        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            flexGrow: 1,
          }}
        >
          <PageCarousel
            pages={data.course.coursePages}
            getPage={(page: CoursePageType) => <CoursePage {...page} />}
          />
        </Box>
      </Box>
    </Layout>
  );
};

export default Course;
