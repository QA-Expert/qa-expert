import { Quiz } from 'graphql-schema/schema.gen';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { Fragment, ReactElement } from 'react';
import client from '../../appolo-client';
import { Content } from '../../src/components/content/content';
import Layout from '../../src/components/layout/layout';
import Sidebar from '../../src/components/sidebar/sidebar';
import { GET_QUIZ } from '../../src/graphql/quieries/quieries';
import { NextPageWithLayout } from '../_app';

const QuizPage: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  return (
    <>
      <Sidebar />
      <Content size="fill">
        <h1>{props?.quiz?.title}</h1>
        <h2>{props?.quiz?.desciption}</h2>
        <span>{props?.quiz?.type}</span>
        <span>{props?.quiz?.expectedResult}</span>
        {props?.quiz?.quizPages.map((page, i) => {
          return (
            <Fragment key={i}>
              <div>{page.title}</div>
              <div>{page.desciption}</div>
              <div>{page.expectedResult}</div>
              {page.questions.map((quistion, j) => {
                return (
                  <Fragment key={j}>
                    <div>{quistion.content}</div>
                    <div>{quistion.expectedResult}</div>
                  </Fragment>
                );
              })}
            </Fragment>
          );
        })}
      </Content>
    </>
  );
};

QuizPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default QuizPage;

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
    quiz: Quiz;
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
