import Link from 'next/link';
import { Card } from '../src/components/card/card';
import Layout from '../src/components/layout/layout';
import { Course, Quiz } from 'graphql-schema-gen/schema.gen';
import { GET_ALL_COURSES_AND_QUIZZES } from '../src/graphql/quieries/quieries';
import { Devider } from '../src/components/devider/devider';
import { Block } from '../src/components/block/block';
import { useQuery } from '@apollo/client';
import { useUser } from '../src/context/auth';

interface Props {
  courses: Course[];
  quizzes: Quiz[];
}

const HomePage = () => {
  const { data, loading, error } = useQuery<Props>(GET_ALL_COURSES_AND_QUIZZES);
  const user = useUser();

  /* TODO: Add TOASTS */
  if (error) {
    return null;
  }

  if (!data) {
    return null;
  }

  return (
    <Layout>
      <Block orientation="column" css={{ gap: '$4', padding: '$4' }}>
        <h1>{user?.email}</h1>
        <h1>Courses</h1>
        {/* TODO: Add Loading indicator */}
        {loading && <p>..... LOADING ......</p>}
        <Block orientation="row" css={{ gap: '$4', flexWrap: 'wrap' }}>
          {data?.courses.map((course: Course) => (
            <Card key={course.id}>
              <Link href={`/course/${course.id}`}>
                <a>{course.title}</a>
              </Link>
            </Card>
          ))}
        </Block>

        <Devider orientation={'horizontal'} />

        <h1>Quizzes</h1>

        <Block orientation="row" css={{ gap: '$4', flexWrap: 'wrap' }}>
          {data?.quizzes.map((quiz: Quiz) => (
            <Card key={quiz.id}>
              <Link href={`/quiz/${quiz.id}`}>
                <a>{quiz.title}</a>
              </Link>
            </Card>
          ))}
        </Block>
      </Block>
    </Layout>
  );
};

export default HomePage;
