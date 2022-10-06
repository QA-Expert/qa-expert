import Link from 'next/link';
import { ReactElement } from 'react';
import client from '../appolo-client';
import { CoursCard } from '../src/components/cours-card/cours-card';
import Layout from '../src/components/layout/layout';
import { NextPageWithLayout } from './_app';
import { Cours, Quiz } from 'graphql-schema/schema.gen';
import { InferGetServerSidePropsType } from 'next';
import { GET_ALL_COURSES_AND_QUIZZES } from '../src/graphql/quieries/quieries';
import { Devider } from '../src/components/devider/devider';
import { Block } from '../src/components/block/block';

const HomePage: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  return (
    <Block orientation="column" css={{ gap: '$4', padding: '$4' }}>
      <h1>Courses</h1>

      <Block orientation="row" css={{ gap: '$4', flexWrap: 'wrap' }}>
        {props.courses.map((cours: Cours) => (
          <CoursCard key={cours.id}>
            <Link href={`/cours/${cours.id}`}>
              <a>{cours.title}</a>
            </Link>
          </CoursCard>
        ))}
      </Block>

      <Devider orientation={'horizontal'} />

      <h1>Quizzes</h1>

      <Block orientation="row" css={{ gap: '$4', flexWrap: 'wrap' }}>
        {props.quizzes.map((quiz: Quiz) => (
          <CoursCard key={quiz.id}>
            <Link href={`/quiz/${quiz.id}`}>
              <a>{quiz.title}</a>
            </Link>
          </CoursCard>
        ))}
      </Block>
    </Block>
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
