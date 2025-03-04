import { gql } from '__generated__';

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

export const LOGIN_SOCIAL = gql(/* GraphQL */ `
  mutation LoginSocial(
    $accessToken: String!
    $provider: String!
    $userId: String
  ) {
    loginSocial(
      data: { accessToken: $accessToken, provider: $provider, userId: $userId }
    ) {
      access_token
    }
  }
`);

export const REGISTER_SOCIAL = gql(/* GraphQL */ `
  mutation RegisterSocial(
    $accessToken: String!
    $provider: String!
    $userId: String
  ) {
    registerSocial(
      data: { accessToken: $accessToken, provider: $provider, userId: $userId }
    ) {
      access_token
    }
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
  mutation CreateQuizPageProgress($data: QuizPageProgressInput!) {
    createQuizPageProgress(data: $data) {
      state
      page
      answers
      data
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
      _id
      badge {
        _id
      }
      createdAt
    }
  }
`);

export const DELETE_COURSE_PROGRESS = gql(/* GraphQL */ `
  mutation DeleteCourseProgresses($_id: String!) {
    deleteCourseProgresses(_id: $_id)
  }
`);

export const VALIDATE_REST_API = gql(/* GraphQL */ `
  mutation ValidateRestApi(
    $stringifiedRequestData: String!
    $expectedAnswerId: String!
  ) {
    validateRestApi(
      stringifiedRequestData: $stringifiedRequestData
      expectedAnswerId: $expectedAnswerId
    ) {
      status
      headers {
        name
        value
      }
      body
    }
  }
`);

export const SEND_BUG_REPORT = gql(/* GraphQL */ `
  mutation SendBugReport($data: EmailInput!) {
    sendBugReport(data: $data)
  }
`);

export const SEND_COMMUNICATION = gql(/* GraphQL */ `
  mutation SendCommunication($data: EmailInput!) {
    sendCommunication(data: $data)
  }
`);

export const LIKE_COURSE = gql(/* GraphQL */ `
  mutation LikeCourse($courseId: String!) {
    likeCourse(courseId: $courseId) {
      _id
    }
  }
`);

export const ADD_PAYMENT_METHOD = gql(/* GraphQL */ `
  mutation AddPaymentMethod($data: PaymentMethodInput!) {
    addPaymentMethod(data: $data) {
      _id
    }
  }
`);

export const REMOVE_PAYMENT_METHOD = gql(/* GraphQL */ `
  mutation RemovePaymentMethod {
    removePaymentMethod {
      _id
    }
  }
`);

export const SUBSCRIBE = gql(/* GraphQL */ `
  mutation Subscribe($data: SubscriptionInput!) {
    subscribe(data: $data) {
      _id
    }
  }
`);

export const ACTIVATE_SUBSCRIPTION = gql(/* GraphQL */ `
  mutation ActivateSubscription($externalId: String!) {
    activateSubscription(externalId: $externalId) {
      _id
    }
  }
`);

export const CANCEL_SUBSCRIPTION = gql(/* GraphQL */ `
  mutation CancelSubscription($externalId: String!) {
    cancelSubscription(externalId: $externalId) {
      _id
    }
  }
`);
