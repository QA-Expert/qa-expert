import Layout from '../src/components/layout/layout';
import { Course, Quiz } from 'graphql-schema-gen/schema.gen';
import { GET_ALL_COURSES_AND_QUIZZES } from '../src/graphql/queries/queries';
import { useQuery } from '@apollo/client';
import Typography from '@mui/material/Typography';
import { CardComponent } from '../src/components/card/card';
import { Box } from '../src/components/box/box';

interface Props {
  courses: Course[];
  quizzes: Quiz[];
}

const HomePage = () => {
  const { data, loading, error } = useQuery<Props>(GET_ALL_COURSES_AND_QUIZZES);

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
            <CardComponent
              key={course._id}
              _id={course._id}
              type="course"
              title={course.title}
              description={course.description}
            />
          ))}
        </Box>

        <Typography variant="h2" sx={{ fontSize: '3rem' }}>
          Quizzes
        </Typography>

        <Box
          sx={{
            flexDirection: 'row',
            gap: '2rem',
            flexWrap: 'wrap',
          }}
        >
          {data?.quizzes.map((quiz: Quiz) => (
            <CardComponent
              key={quiz._id}
              _id={quiz._id}
              type="quiz"
              title={quiz.title}
              description={quiz.description}
            />
          ))}
        </Box>
      </Box>
    </Layout>
  );
};

export default HomePage;
