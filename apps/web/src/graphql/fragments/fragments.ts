import { gql } from '@apollo/client';

export const QUESTION_FRAGMENT = gql`
  fragment QuestionFragment on Question {
    content
    answers {
      _id
      content
    }
    options {
      _id
      content
    }
  }
`;

export const COURSE_HEADING_FRAGMENT = gql`
  fragment CourseHeadingFragment on Course {
    _id
    title
    description
  }
`;

export const QUIZ_HEADING_FRAGMENT = gql`
  fragment QuizHeadingFragment on Quiz {
    _id
    title
    description
  }
`;

export const QUIZ_PAGE_FRAGMENT = gql`
  ${QUESTION_FRAGMENT}
  fragment QuizPageFragment on QuizPage {
    _id
    title
    description
    question {
      ...QuestionFragment
    }
  }
`;
