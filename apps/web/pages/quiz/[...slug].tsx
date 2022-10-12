import { useLazyQuery } from '@apollo/client';
import {
  Quiz as QuizType,
  QuizPage as QuizPageType,
} from 'graphql-schema-gen/schema.gen';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';
import { Block } from '../../src/components/block/block';
import Layout from '../../src/components/layout/layout';
import { PageCarousel } from '../../src/components/page-carousel/page-carousel';
import QuizPage from '../../src/components/quiz-page/quiz-page';
import Sidebar from '../../src/components/sidebar/sidebar';
import { GET_QUIZ } from '../../src/graphql/quieries/quieries';

const Quiz = () => {
  const route = useRouter();
  const { slug } = route.query;

  const [getData, { loading, data, error }] = useLazyQuery<{
    cours: QuizType;
  }>(GET_QUIZ);

  // This boilerplate is used to handle slug[0] could be undefined on first render
  useEffect(() => {
    if (slug && getData) {
      getData({
        variables: {
          quizId: slug[0],
        },
      });
    }
  }, [getData, slug]);

  /* TODO: Add TOASTS */
  if (error) {
    return null;
  }

  if (!data) {
    return null;
  }

  return (
    <>
      <Sidebar />
      <Block
        size="fill"
        orientation="column"
        css={{
          justifyContent: 'start',
          padding: '$4',
        }}
      >
        {/* TODO: Add Loading indicator */}
        {loading && <p>..... LOADING ......</p>}

        <Block orientation="column">
          <h1>{data.quiz.title}</h1>
          <h2>{data.quiz.desciption}</h2>
          <span>{data.quiz.type}</span>
          <span>{data.quiz.expectedResult}</span>{' '}
        </Block>

        <Block css={{ flexGrow: 1 }} size="fill">
          <PageCarousel
            pages={data.quiz.quizPages}
            getPage={(page: QuizPageType) => <QuizPage {...page} />}
          />
        </Block>
      </Block>
    </>
  );
};

Quiz.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Quiz;
