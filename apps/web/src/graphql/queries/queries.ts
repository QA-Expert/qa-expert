import { gql } from '@apollo/client';
import {
  COURSE_HEADING_FRAGMENT,
  QUIZ_HEADING_FRAGMENT,
  QUIZ_PAGE_FRAGMENT,
} from '../fragments/fragments';

export const GET_ALL_COURSES_AND_QUIZZES = gql`
  ${COURSE_HEADING_FRAGMENT}
  ${QUIZ_HEADING_FRAGMENT}
  query GetAllCoursesAndQuizzes {
    courses {
      _id
      ...CourseHeadingFragment
    }
    quizzes {
      _id
      type
      ...QuizHeadingFragment
    }
  }
`;

export const GET_QUIZ = gql`
  ${QUIZ_HEADING_FRAGMENT}
  ${QUIZ_PAGE_FRAGMENT}
  query GetQuiz($quizId: String!) {
    quiz(_id: $quizId) {
      _id
      ...QuizHeadingFragment
      quizPages {
        id
        ...QuizPageFragment
      }
    }
  }
`;

export const GET_COURSE = gql`
  ${COURSE_HEADING_FRAGMENT}
  query GetCourse($courseId: String!) {
    course(_id: $courseId) {
      ...CourseHeadingFragment
      coursePages {
        _id
        title
        description
      }
    }
  }
`;

export const GET_USER = gql`
  query GetUser {
    user {
      _id
      email
      firstName
      lastName
    }
  }
`;

export const GET_QUIZ_PROGRESS = gql`
  query GetQuizProgresses($quizId: String!) {
    quizProgresses(quizId: $quizId) {
      state
      quiz
      quizPage
      user
      answer
    }
  }
`;
