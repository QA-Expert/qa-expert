import { useQuery } from '@apollo/client';
import { Divider, Typography } from '@mui/material';
import { Course as CourseType } from 'graphql-schema-gen/schema.gen';
import { useRouter } from 'next/router';
import { Box } from '../../src/components/box/box';
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
          flex: 1,
          padding: '1rem',
          gap: '1rem',
          borderRadius: 0,
        }}
      >
        {/* TODO: Add Loading indicator */}
        {loading && <p>..... LOADING ......</p>}

        <Box
          sx={{
            width: '100%',
            gap: '1rem',
          }}
        >
          <Typography variant="h2" sx={{ fontSize: '2rem' }}>
            {data.course.title}
          </Typography>
          <Typography variant="h3" sx={{ fontSize: '1.5rem' }}>
            {data.course.description}
          </Typography>
        </Box>

        <Divider sx={{ width: '100%' }} />

        <Box
          sx={{
            width: '100%',
            flexGrow: 1,
          }}
        >
          <PageCarousel>
            {data.course.coursePages.map((page, i) => (
              <CoursePage key={i} {...page} />
            ))}
          </PageCarousel>
        </Box>
      </Box>
    </Layout>
  );
};

export default Course;
