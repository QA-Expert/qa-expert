import { Page as Props } from 'graphql-schema-gen/schema.gen';
import CoursePage from '../course-page/course-page';
import QuizPage from '../quiz-page/quiz-page';

export default function Page(props: Props) {
  return (
    <>
      {props.type === 'COURSE' ? (
        <CoursePage {...props} />
      ) : (
        <QuizPage {...props} />
      )}
    </>
  );
}
