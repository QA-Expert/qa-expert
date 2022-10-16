import Layout from '../src/components/layout/layout';
import { Course, Quiz } from 'graphql-schema-gen/schema.gen';
import { GET_ALL_COURSES_AND_QUIZZES } from '../src/graphql/quieries/quieries';
import { useQuery } from '@apollo/client';
import { useUser } from '../src/context/auth';
import { Box, Typography } from '@mui/material';
import { CardComponent } from '../src/components/card/card';
import { useRouter } from 'next/router';

interface Props {
  courses: Course[];
  quizzes: Quiz[];
}

const HomePage = () => {
  const { data, loading, error } = useQuery<Props>(GET_ALL_COURSES_AND_QUIZZES);
  const user = useUser();
  const router = useRouter();

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
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          alignItems: 'center',
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
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center',
            gap: '2rem',
            flexWrap: 'wrap',
          }}
        >
          {data?.courses.map((course: Course) => (
            <CardComponent
              key={course.id}
              id={course.id}
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
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center',
            gap: '2rem',
            flexWrap: 'wrap',
          }}
        >
          {data?.quizzes.map((quiz: Quiz) => (
            <CardComponent
              key={quiz.id}
              id={quiz.id}
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
