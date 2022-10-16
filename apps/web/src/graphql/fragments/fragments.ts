import { gql } from '@apollo/client';

export const QUIESTION_FRAGMENT = gql`
  fragment QuestionFragment on Question {
    content
    expectedResult
  }
`;

export const COURSE_HEADING_FRAGMENT = gql`
  fragment CourseHeadingFragment on Course {
    title
    description
  }
`;

export const QUIZ_HEADING_FRAGMENT = gql`
  fragment QuizHeadingFragment on Quiz {
    title
    description
  }
`;

export const QUIZ_PAGE_FRAGMENT = gql`
  ${QUIESTION_FRAGMENT}
  fragment QuizPageFragment on QuizPage {
    title
    description
    expectedResult
    questions {
      ...QuestionFragment
    }
  }
`;
