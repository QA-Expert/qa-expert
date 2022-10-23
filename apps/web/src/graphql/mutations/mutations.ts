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
    $quizId: String!
    $quizPageId: String!
    $answerIds: [String!]
  ) {
    createQuizProgress(
      data: {
        state: $state
        quiz: $quizId
        quizPage: $quizPageId
        answers: $answerIds
      }
    ) {
      quizId
    }
  }
`;
