import { gql } from '@apollo/client';
import {
  COURS_HEADING_FRAGMENT,
  QUIZ_HEADING_FRAGMENT,
  QUIZ_PAGE_FRAGMENT,
} from '../fragments/fragments';

export const GET_ALL_COURSES_AND_QUIZZES = gql`
  ${COURS_HEADING_FRAGMENT}
  ${QUIZ_HEADING_FRAGMENT}
  query GetAllCoursesAndQuizzes {
    courses {
      id
      ...CoursHeadingFragment
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

export const GET_COURS = gql`
  ${COURS_HEADING_FRAGMENT}
  query GetCours($coursId: String!) {
    cours(id: $coursId) {
      ...CoursHeadingFragment
      coursPages {
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
