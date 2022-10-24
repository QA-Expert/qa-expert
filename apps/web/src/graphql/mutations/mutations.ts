import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      access_token
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;

export const REGISTER = gql`
  mutation Register(
    $email: String!
    $password: String!
    $firstName: String
    $lastName: String
  ) {
    register(
      data: {
        email: $email
        password: $password
        firstName: $firstName
        lastName: $lastName
      }
    ) {
      access_token
    }
  }
`;

export const CREATE_QUIZ_PROGRESS = gql`
  mutation CreateQuizProgress(
    $state: QuizPageProgressState!
    $quiz: String!
    $quizPage: String!
    $answers: [String!]
  ) {
    createQuizProgress(
      data: {
        state: $state
        quiz: $quiz
        quizPage: $quizPage
        answers: $answers
      }
    ) {
      state
      quiz
      quizPage
      answers
    }
  }
`;

export const UPDATE_COURSE_PAGE_CONTENT = gql`
  mutation UpdateCoursePageContent($coursePageId: String!, $content: String!) {
    updateCoursePageContent(data: { Id: $coursePageId, content: $content }) {
      content
    }
  }
`;
