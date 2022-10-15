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
      id
      ...CourseHeadingFragment
    }
    quizzes {
      id
      type
      ...QuizHeadingFragment
    }
  }
`;

export const GET_QUIZ = gql`
  ${QUIZ_HEADING_FRAGMENT}
  ${QUIZ_PAGE_FRAGMENT}
  query GetQuiz($quizId: String!) {
    quiz(id: $quizId) {
      id
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
    course(id: $courseId) {
      ...CourseHeadingFragment
      coursePages {
        id
        title
        desciption
      }
    }
  }
`;

export const ACCESS_TOKEN = gql`
  query AccessToken($access_token: String) {
    access_token
  }
`;

export const GET_USER = gql`
  query GetUser {
    user {
      email
      firstName
      lastName
    }
  }
`;
