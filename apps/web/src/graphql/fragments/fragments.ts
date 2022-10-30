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
    type
    description
  }
`;

export const PAGE_FRAGMENT = gql`
  ${QUESTION_FRAGMENT}
  fragment PageFragment on Page {
    _id
    title
    type
    description
    content
    question {
      ...QuestionFragment
    }
    progress {
      _id
      state
      answers
    }
  }
`;
