import { gql } from '@apollo/client';
import { Quiz } from 'graphql-schema/schema.gen';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { ReactElement } from 'react';
import client from '../../appolo-client';
import Content from '../../src/components/content/content';
import Layout from '../../src/components/layout/layout';
import Sidebar from '../../src/components/sidebar/sidebar';
import { NextPageWithLayout } from '../_app';

const CoursPage: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  return (
    <>
      <Sidebar />
      <Content>
        <h1>{props?.quiz?.title}</h1>
        <h2>{props?.quiz?.desciption}</h2>
      </Content>
    </>
  );
};

CoursPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default CoursPage;

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
    query: gql`
      query GetQuiz($quizId: String!) {
        quiz(id: $quizId) {
          title
          desciption
          quizPages {
            id
            title
            desciption
            expectedResult
            questions {
              id
              content
              expectedResult
            }
          }
        }
      }
    `,
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
