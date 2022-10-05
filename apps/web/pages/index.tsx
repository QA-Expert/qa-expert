import Link from 'next/link';
import { ReactElement } from 'react';
import client from '../appolo-client';
import { Content } from '../src/components/content/content';
import { CoursCard } from '../src/components/cours-card/cours-card';
import Layout from '../src/components/layout/layout';
import { NextPageWithLayout } from './_app';
import { Cours, Quiz } from 'graphql-schema/schema.gen';
import { InferGetServerSidePropsType } from 'next';
import { GET_ALL_COURSES_AND_QUIZZES } from '../src/graphql/quieries/quieries';
import { Devider } from '../src/components/devider/devider';

const HomePage: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  return (
    <>
      <Content orientation="vertical">
        <h1>Courses</h1>
        <Content orientation="vertical">
          {props.courses.map((cours: Cours) => (
            <CoursCard key={cours.id}>
              <Link href={`/cours/${cours.id}`}>
                <a>{cours.title}</a>
              </Link>
            </CoursCard>
          ))}
        </Content>

        <Devider orientation={'horizontal'} />

        <h1>Quizzes</h1>

        <Content orientation="vertical">
          {props.quizzes.map((quiz: Quiz) => (
            <CoursCard key={quiz.id}>
              <Link href={`/quiz/${quiz.id}`}>
                <a>{quiz.title}</a>
              </Link>
            </CoursCard>
          ))}
        </Content>
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
    query: GET_ALL_COURSES_AND_QUIZZES,
  });

  return {
    props: {
      courses: data.courses,
      quizzes: data.quizzes,
    },
  };
}
