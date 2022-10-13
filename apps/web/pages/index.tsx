import Link from 'next/link';
import { ReactElement } from 'react';
import { CoursCard } from '../src/components/cours-card/cours-card';
import Layout from '../src/components/layout/layout';
import { Cours, Quiz } from 'graphql-schema-gen/schema.gen';
import { GET_ALL_COURSES_AND_QUIZZES } from '../src/graphql/quieries/quieries';
import { Devider } from '../src/components/devider/devider';
import { Block } from '../src/components/block/block';
import { useQuery } from '@apollo/client';

interface Props {
  courses: Cours[];
  quizzes: Quiz[];
}

const HomePage = () => {
  const { data, loading, error } = useQuery<Props>(GET_ALL_COURSES_AND_QUIZZES);

  /* TODO: Add TOASTS */
  if (error) {
    return null;
  }

  if (!data) {
    return null;
  }

  return (
    <Block orientation="column" css={{ gap: '$4', padding: '$4' }}>
      <h1>Courses</h1>
      {/* TODO: Add Loading indicator */}
      {loading && <p>..... LOADING ......</p>}
      <Block orientation="row" css={{ gap: '$4', flexWrap: 'wrap' }}>
        {data?.courses.map((cours: Cours) => (
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
        {data?.quizzes.map((quiz: Quiz) => (
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
