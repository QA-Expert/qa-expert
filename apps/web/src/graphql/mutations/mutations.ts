import { gql } from '../../__generated__/gql';

export const LOGIN = gql(/* GraphQL */ `
  mutation Login($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      access_token
    }
  }
`);

export const LOGOUT = gql(/* GraphQL */ `
  mutation Logout {
    logout
  }
`);

export const REGISTER = gql(/* GraphQL */ `
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
`);

export const CREATE_QUIZ_PAGE_PROGRESS = gql(/* GraphQL */ `
  mutation CreateQuizPageProgress(
    $state: PageProgressState!
    $page: String!
    $course: String!
    $answers: [String!]!
  ) {
    createQuizPageProgress(
      data: { state: $state, page: $page, course: $course, answers: $answers }
    ) {
      state
      page
      answers
    }
  }
`);

export const CREATE_COURSE_PAGE_PROGRESS = gql(/* GraphQL */ `
  mutation CreateCoursePageProgress($page: String!, $course: String!) {
    createCoursePageProgress(data: { page: $page, course: $course }) {
      _id
    }
  }
`);

export const UPDATE_COURSE_PAGE_CONTENT = gql(/* GraphQL */ `
  mutation updateCoursePageContent($_id: String!, $content: String!) {
    updateCoursePageContent(_id: $_id, data: { content: $content }) {
      content
    }
  }
`);

export const RESET_PASSWORD = gql(/* GraphQL */ `
  mutation ResetPassword($data: ResetPasswordInput!) {
    resetPassword(data: $data) {
      _id
    }
  }
`);

export const FORGOT_PASSWORD = gql(/* GraphQL */ `
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`);

export const UPDATE_USER_NAMES = gql(/* GraphQL */ `
  mutation UpdateUserNames($firstName: String, $lastName: String) {
    updateUserNames(data: { firstName: $firstName, lastName: $lastName }) {
      firstName
      lastName
    }
  }
`);

export const UPDATE_USER_PASSWORD = gql(/* GraphQL */ `
  mutation UpdateUserPassword($oldPassword: String!, $newPassword: String!) {
    updateUserPassword(
      data: { oldPassword: $oldPassword, newPassword: $newPassword }
    ) {
      _id
    }
  }
`);

export const CLAIM_BADGE = gql(/* GraphQL */ `
  mutation ClaimBadge($badgeId: String!) {
    claimBadge(badgeId: $badgeId) {
      badges
    }
  }
`);
