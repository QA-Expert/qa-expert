import { useQuery } from '@apollo/client';
import { Box, Container } from '@mui/material';
import {
  Quiz as QuizType,
  QuizPage as QuizPageType,
} from 'graphql-schema-gen/schema.gen';
import { useRouter } from 'next/router';
import Layout from '../../src/components/layout/layout';
import { PageCarousel } from '../../src/components/page-carousel/page-carousel';
import QuizPage from '../../src/components/quiz-page/quiz-page';
import Sidebar from '../../src/components/sidebar/sidebar';
import { GET_QUIZ } from '../../src/graphql/quieries/quieries';

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
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'start',
          alignItems: 'center',
          flexDirection: 'column',
          flex: 1,
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
          <h1>{data.quiz.title}</h1>
          <h2>{data.quiz.description}</h2>
          <span>{data.quiz.type}</span>
          <span>{data.quiz.expectedResult}</span>
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
            pages={data.quiz.quizPages}
            getPage={(page: QuizPageType) => <QuizPage {...page} />}
          />
        </Box>
      </Box>
    </Layout>
  );
};

export default Quiz;
