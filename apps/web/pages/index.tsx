import Layout from '../src/components/layout/layout';
import { Course } from 'graphql-schema-gen/schema.gen';
import { GET_ALL_COURSES } from '../src/graphql/queries/queries';
import { useQuery } from '@apollo/client';
import Typography from '@mui/material/Typography';
import { CardComponent } from '../src/components/card/card';
import { Box } from '../src/components/box/box';

interface Props {
  courses: Course[];
}

const HomePage = () => {
  const { data, loading, error } = useQuery<Props>(GET_ALL_COURSES);

  /* TODO: Add TOASTS */
  if (error) {
    return null;
  }

  if (!data) {
    return null;
  }

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

        {/* TODO: Add Loading indicator */}
        {loading && <p>..... LOADING ......</p>}

        <Box
          sx={{
            flexDirection: 'row',
            gap: '2rem',
            flexWrap: 'wrap',
          }}
        >
          {data?.courses.map((course: Course) => (
            <CardComponent key={course._id} {...course} />
          ))}
        </Box>
      </Box>
    </Layout>
  );
};

export default HomePage;
