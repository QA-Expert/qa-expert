import { gql } from '@apollo/client';
import Link from 'next/link';
import { ReactElement } from 'react';
import client from '../appolo-client';
import Content from '../src/components/content/content';
import { CoursCard } from '../src/components/cours-card/cours-card';
import Layout from '../src/components/layout/layout';
import { NextPageWithLayout } from './_app';
import { Cours, Quiz } from 'graphql-schema/schema.gen';
import { InferGetServerSidePropsType } from 'next';

const HomePage: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  return (
    <>
      <Content>
        {props.courses.map((cours: Cours) => (
          <CoursCard key={cours.id}>
            <Link href={`/cours/${cours.id}`}>
              <a>{cours.title}</a>
            </Link>
          </CoursCard>
        ))}
        <hr />
        {/* @ts-ignore */}
        {props.quizzes.map((quiz: Quiz) => (
          <CoursCard key={quiz.id}>
            <Link href={`/cours/${quiz.id}`}>
              <a>{quiz.title}</a>
            </Link>
          </CoursCard>
        ))}
      </Content>
    </>
  );
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default HomePage;

interface Props {
  courses: Cours[];
  quizzes: Quiz[];
}

export async function getServerSideProps() {
  const { data } = await client.query<Props>({
    query: gql`
      query GetAllCoursesAndQuizzes {
        courses {
          id
          title
          desciption
        }
        quizzes {
          id
          title
          type
          desciption
        }
      }
    `,
  });

  return {
    props: {
      courses: data.courses,
      quizzes: data.quizzes,
    },
  };
}
