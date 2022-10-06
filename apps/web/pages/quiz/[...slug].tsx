import {
  Quiz as QuizType,
  QuizPage as QuizPageType,
} from 'graphql-schema/schema.gen';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { ReactElement } from 'react';
import client from '../../appolo-client';
import { Block } from '../../src/components/block/block';
import Layout from '../../src/components/layout/layout';
import { PageCarousel } from '../../src/components/page-carousel/page-carousel';
import QuizPage from '../../src/components/quiz-page/quiz-page';
import Sidebar from '../../src/components/sidebar/sidebar';
import { GET_QUIZ } from '../../src/graphql/quieries/quieries';
import { NextPageWithLayout } from '../_app';

const Quiz: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
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
        <Block orientation="column">
          <h1>{props?.quiz?.title}</h1>
          <h2>{props?.quiz?.desciption}</h2>
          <span>{props?.quiz?.type}</span>
          <span>{props?.quiz?.expectedResult}</span>{' '}
        </Block>

        <Block css={{ flexGrow: 1 }} size="fill">
          <PageCarousel
            pages={props?.quiz?.quizPages}
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { slug } = context.query;

  if (!slug?.length) {
    return {
      props: {
        quiz: null,
      },
    };
  }

  const { data } = await client.query<{
    quiz: QuizType;
  }>({
    query: GET_QUIZ,
    variables: {
      quizId: slug[0],
    },
  });

  return {
    props: {
      quiz: data.quiz,
    },
  };
}
