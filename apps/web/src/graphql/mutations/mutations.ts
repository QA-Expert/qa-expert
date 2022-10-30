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

export const CREATE_QUIZ_PAGE_PROGRESS = gql`
  mutation CreateQuizPageProgress(
    $state: PageProgressState!
    $page: String!
    $answers: [String!]!
  ) {
    createQuizPageProgress(
      data: { state: $state, page: $page, answers: $answers }
    ) {
      state
      page
      answers
    }
  }
`;

export const CREATE_COURSE_PAGE_PROGRESS = gql`
  mutation CreateCoursePageProgress($page: String!) {
    createCoursePageProgress(data: { page: $page }) {
      _id
    }
  }
`;

export const UPDATE_COURSE_PAGE_CONTENT = gql`
  mutation updateCoursePageContent($_id: String!, $content: String!) {
    updateCoursePageContent(_id: $_id, data: { content: $content }) {
      content
    }
  }
`;
