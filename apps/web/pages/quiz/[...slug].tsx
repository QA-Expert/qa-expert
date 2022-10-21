import { useQuery } from '@apollo/client';
import { Box, Divider, Paper, Typography } from '@mui/material';
import { Quiz as QuizType } from 'graphql-schema-gen/schema.gen';
import { useRouter } from 'next/router';
import Layout from '../../src/components/layout/layout';
import { PageCarousel } from '../../src/components/page-carousel/page-carousel';
import QuizPage from '../../src/components/quiz-page/quiz-page';
import Sidebar from '../../src/components/sidebar/sidebar';
import { GET_QUIZ } from '../../src/graphql/queries/queries';

const Quiz = () => {
  const route = useRouter();
  const slug = route.query.slug ? route.query.slug[0] : null;

  const { loading, data, error } = useQuery<{
    quiz: QuizType;
  }>(GET_QUIZ, {
    variables: { quizId: slug },
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
      <Paper
        component={Box}
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
            {data.quiz.title}
          </Typography>
          <Typography variant="h3" sx={{ fontSize: '1.5rem' }}>
            {data.quiz.description}
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
            {data.quiz.quizPages.map((page, i) => (
              <QuizPage key={i} {...page} />
            ))}
          </PageCarousel>
        </Box>
      </Paper>
    </Layout>
  );
};

export default Quiz;
