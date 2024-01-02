/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  '\n  mutation Login($email: String!, $password: String!) {\n    login(data: { email: $email, password: $password }) {\n      access_token\n    }\n  }\n':
    types.LoginDocument,
  '\n  mutation Logout {\n    logout\n  }\n': types.LogoutDocument,
  '\n  mutation Register(\n    $email: String!\n    $password: String!\n    $firstName: String\n    $lastName: String\n  ) {\n    register(\n      data: {\n        email: $email\n        password: $password\n        firstName: $firstName\n        lastName: $lastName\n      }\n    ) {\n      access_token\n    }\n  }\n':
    types.RegisterDocument,
  '\n  mutation CreateQuizPageProgress(\n    $state: PageProgressState!\n    $page: String!\n    $course: String!\n    $answers: [String!]!\n  ) {\n    createQuizPageProgress(\n      data: { state: $state, page: $page, course: $course, answers: $answers }\n    ) {\n      state\n      page\n      answers\n    }\n  }\n':
    types.CreateQuizPageProgressDocument,
  '\n  mutation CreateCoursePageProgress($page: String!, $course: String!) {\n    createCoursePageProgress(data: { page: $page, course: $course }) {\n      _id\n    }\n  }\n':
    types.CreateCoursePageProgressDocument,
  '\n  mutation updateCoursePageContent($_id: String!, $content: String!) {\n    updateCoursePageContent(_id: $_id, data: { content: $content }) {\n      content\n    }\n  }\n':
    types.UpdateCoursePageContentDocument,
  '\n  mutation ResetPassword($data: ResetPasswordInput!) {\n    resetPassword(data: $data) {\n      _id\n    }\n  }\n':
    types.ResetPasswordDocument,
  '\n  mutation ForgotPassword($email: String!) {\n    forgotPassword(email: $email)\n  }\n':
    types.ForgotPasswordDocument,
  '\n  mutation UpdateUserNames($firstName: String, $lastName: String) {\n    updateUserNames(data: { firstName: $firstName, lastName: $lastName }) {\n      firstName\n      lastName\n    }\n  }\n':
    types.UpdateUserNamesDocument,
  '\n  mutation UpdateUserPassword($oldPassword: String!, $newPassword: String!) {\n    updateUserPassword(\n      data: { oldPassword: $oldPassword, newPassword: $newPassword }\n    ) {\n      _id\n    }\n  }\n':
    types.UpdateUserPasswordDocument,
  '\n  mutation ClaimBadge($badgeId: String!) {\n    claimBadge(badgeId: $badgeId) {\n      badges\n    }\n  }\n':
    types.ClaimBadgeDocument,
  '\n  mutation DeleteCourseProgresses($_id: String!) {\n    deleteCourseProgresses(_id: $_id)\n  }\n':
    types.DeleteCourseProgressesDocument,
  '\n  query GetAllCourses {\n    courses {\n      _id\n      title\n      type\n      level\n      description\n      pages {\n        _id\n        type\n      }\n      recommendedCourses {\n        _id\n        title\n        level\n        progress {\n          state\n        }\n      }\n      tags\n      progress {\n        pass\n        fail\n        state\n        updatedAt\n      }\n      badge {\n        _id\n      }\n    }\n  }\n':
    types.GetAllCoursesDocument,
  '\n  query GetAllCoursesPublic {\n    coursesPublic {\n      _id\n      title\n      type\n      level\n      description\n      pages {\n        _id\n        type\n      }\n      tags\n      recommendedCourses {\n        _id\n        title\n        level\n      }\n    }\n  }\n':
    types.GetAllCoursesPublicDocument,
  '\n  query GetCourse($_id: String!) {\n    course(_id: $_id) {\n      _id\n      title\n      type\n      level\n      description\n      progress {\n        pagesLeftBeforeFinish\n        pass\n        fail\n        state\n        updatedAt\n      }\n      badge {\n        _id\n      }\n      pages {\n        _id\n        title\n        type\n        description\n        content\n        question {\n          content\n          answers {\n            _id\n            content\n          }\n          options {\n            _id\n            content\n          }\n        }\n        progress {\n          _id\n          state\n          answers\n        }\n      }\n      recommendedCourses {\n        _id\n        title\n        level\n        progress {\n          state\n        }\n      }\n    }\n  }\n':
    types.GetCourseDocument,
  '\n  query GetCourseProgressAndBadge($_id: String!) {\n    course(_id: $_id) {\n      _id\n      progress {\n        pass\n        fail\n        state\n        updatedAt\n      }\n      badge {\n        _id\n      }\n    }\n  }\n':
    types.GetCourseProgressAndBadgeDocument,
  '\n  query GetUser {\n    user {\n      _id\n      email\n      firstName\n      lastName\n      roles\n      badges\n    }\n  }\n':
    types.GetUserDocument,
  '\n  query GetBadgesSubmittedProgressesUser {\n    badges {\n      _id\n      title\n      description\n      icon\n      link\n      course {\n        _id\n        title\n      }\n    }\n    submittedProgresses {\n      _id\n      totalProgress\n      quizProgress\n      courseProgress\n      createdAt\n      course {\n        _id\n        title\n      }\n    }\n    user {\n      _id\n      email\n      firstName\n      lastName\n      roles\n      badges\n    }\n  }\n':
    types.GetBadgesSubmittedProgressesUserDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation Login($email: String!, $password: String!) {\n    login(data: { email: $email, password: $password }) {\n      access_token\n    }\n  }\n',
): (typeof documents)['\n  mutation Login($email: String!, $password: String!) {\n    login(data: { email: $email, password: $password }) {\n      access_token\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation Logout {\n    logout\n  }\n',
): (typeof documents)['\n  mutation Logout {\n    logout\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation Register(\n    $email: String!\n    $password: String!\n    $firstName: String\n    $lastName: String\n  ) {\n    register(\n      data: {\n        email: $email\n        password: $password\n        firstName: $firstName\n        lastName: $lastName\n      }\n    ) {\n      access_token\n    }\n  }\n',
): (typeof documents)['\n  mutation Register(\n    $email: String!\n    $password: String!\n    $firstName: String\n    $lastName: String\n  ) {\n    register(\n      data: {\n        email: $email\n        password: $password\n        firstName: $firstName\n        lastName: $lastName\n      }\n    ) {\n      access_token\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation CreateQuizPageProgress(\n    $state: PageProgressState!\n    $page: String!\n    $course: String!\n    $answers: [String!]!\n  ) {\n    createQuizPageProgress(\n      data: { state: $state, page: $page, course: $course, answers: $answers }\n    ) {\n      state\n      page\n      answers\n    }\n  }\n',
): (typeof documents)['\n  mutation CreateQuizPageProgress(\n    $state: PageProgressState!\n    $page: String!\n    $course: String!\n    $answers: [String!]!\n  ) {\n    createQuizPageProgress(\n      data: { state: $state, page: $page, course: $course, answers: $answers }\n    ) {\n      state\n      page\n      answers\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation CreateCoursePageProgress($page: String!, $course: String!) {\n    createCoursePageProgress(data: { page: $page, course: $course }) {\n      _id\n    }\n  }\n',
): (typeof documents)['\n  mutation CreateCoursePageProgress($page: String!, $course: String!) {\n    createCoursePageProgress(data: { page: $page, course: $course }) {\n      _id\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation updateCoursePageContent($_id: String!, $content: String!) {\n    updateCoursePageContent(_id: $_id, data: { content: $content }) {\n      content\n    }\n  }\n',
): (typeof documents)['\n  mutation updateCoursePageContent($_id: String!, $content: String!) {\n    updateCoursePageContent(_id: $_id, data: { content: $content }) {\n      content\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation ResetPassword($data: ResetPasswordInput!) {\n    resetPassword(data: $data) {\n      _id\n    }\n  }\n',
): (typeof documents)['\n  mutation ResetPassword($data: ResetPasswordInput!) {\n    resetPassword(data: $data) {\n      _id\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation ForgotPassword($email: String!) {\n    forgotPassword(email: $email)\n  }\n',
): (typeof documents)['\n  mutation ForgotPassword($email: String!) {\n    forgotPassword(email: $email)\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation UpdateUserNames($firstName: String, $lastName: String) {\n    updateUserNames(data: { firstName: $firstName, lastName: $lastName }) {\n      firstName\n      lastName\n    }\n  }\n',
): (typeof documents)['\n  mutation UpdateUserNames($firstName: String, $lastName: String) {\n    updateUserNames(data: { firstName: $firstName, lastName: $lastName }) {\n      firstName\n      lastName\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation UpdateUserPassword($oldPassword: String!, $newPassword: String!) {\n    updateUserPassword(\n      data: { oldPassword: $oldPassword, newPassword: $newPassword }\n    ) {\n      _id\n    }\n  }\n',
): (typeof documents)['\n  mutation UpdateUserPassword($oldPassword: String!, $newPassword: String!) {\n    updateUserPassword(\n      data: { oldPassword: $oldPassword, newPassword: $newPassword }\n    ) {\n      _id\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation ClaimBadge($badgeId: String!) {\n    claimBadge(badgeId: $badgeId) {\n      badges\n    }\n  }\n',
): (typeof documents)['\n  mutation ClaimBadge($badgeId: String!) {\n    claimBadge(badgeId: $badgeId) {\n      badges\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation DeleteCourseProgresses($_id: String!) {\n    deleteCourseProgresses(_id: $_id)\n  }\n',
): (typeof documents)['\n  mutation DeleteCourseProgresses($_id: String!) {\n    deleteCourseProgresses(_id: $_id)\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetAllCourses {\n    courses {\n      _id\n      title\n      type\n      level\n      description\n      pages {\n        _id\n        type\n      }\n      recommendedCourses {\n        _id\n        title\n        level\n        progress {\n          state\n        }\n      }\n      tags\n      progress {\n        pass\n        fail\n        state\n        updatedAt\n      }\n      badge {\n        _id\n      }\n    }\n  }\n',
): (typeof documents)['\n  query GetAllCourses {\n    courses {\n      _id\n      title\n      type\n      level\n      description\n      pages {\n        _id\n        type\n      }\n      recommendedCourses {\n        _id\n        title\n        level\n        progress {\n          state\n        }\n      }\n      tags\n      progress {\n        pass\n        fail\n        state\n        updatedAt\n      }\n      badge {\n        _id\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetAllCoursesPublic {\n    coursesPublic {\n      _id\n      title\n      type\n      level\n      description\n      pages {\n        _id\n        type\n      }\n      tags\n      recommendedCourses {\n        _id\n        title\n        level\n      }\n    }\n  }\n',
): (typeof documents)['\n  query GetAllCoursesPublic {\n    coursesPublic {\n      _id\n      title\n      type\n      level\n      description\n      pages {\n        _id\n        type\n      }\n      tags\n      recommendedCourses {\n        _id\n        title\n        level\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetCourse($_id: String!) {\n    course(_id: $_id) {\n      _id\n      title\n      type\n      level\n      description\n      progress {\n        pagesLeftBeforeFinish\n        pass\n        fail\n        state\n        updatedAt\n      }\n      badge {\n        _id\n      }\n      pages {\n        _id\n        title\n        type\n        description\n        content\n        question {\n          content\n          answers {\n            _id\n            content\n          }\n          options {\n            _id\n            content\n          }\n        }\n        progress {\n          _id\n          state\n          answers\n        }\n      }\n      recommendedCourses {\n        _id\n        title\n        level\n        progress {\n          state\n        }\n      }\n    }\n  }\n',
): (typeof documents)['\n  query GetCourse($_id: String!) {\n    course(_id: $_id) {\n      _id\n      title\n      type\n      level\n      description\n      progress {\n        pagesLeftBeforeFinish\n        pass\n        fail\n        state\n        updatedAt\n      }\n      badge {\n        _id\n      }\n      pages {\n        _id\n        title\n        type\n        description\n        content\n        question {\n          content\n          answers {\n            _id\n            content\n          }\n          options {\n            _id\n            content\n          }\n        }\n        progress {\n          _id\n          state\n          answers\n        }\n      }\n      recommendedCourses {\n        _id\n        title\n        level\n        progress {\n          state\n        }\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetCourseProgressAndBadge($_id: String!) {\n    course(_id: $_id) {\n      _id\n      progress {\n        pass\n        fail\n        state\n        updatedAt\n      }\n      badge {\n        _id\n      }\n    }\n  }\n',
): (typeof documents)['\n  query GetCourseProgressAndBadge($_id: String!) {\n    course(_id: $_id) {\n      _id\n      progress {\n        pass\n        fail\n        state\n        updatedAt\n      }\n      badge {\n        _id\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetUser {\n    user {\n      _id\n      email\n      firstName\n      lastName\n      roles\n      badges\n    }\n  }\n',
): (typeof documents)['\n  query GetUser {\n    user {\n      _id\n      email\n      firstName\n      lastName\n      roles\n      badges\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetBadgesSubmittedProgressesUser {\n    badges {\n      _id\n      title\n      description\n      icon\n      link\n      course {\n        _id\n        title\n      }\n    }\n    submittedProgresses {\n      _id\n      totalProgress\n      quizProgress\n      courseProgress\n      createdAt\n      course {\n        _id\n        title\n      }\n    }\n    user {\n      _id\n      email\n      firstName\n      lastName\n      roles\n      badges\n    }\n  }\n',
): (typeof documents)['\n  query GetBadgesSubmittedProgressesUser {\n    badges {\n      _id\n      title\n      description\n      icon\n      link\n      course {\n        _id\n        title\n      }\n    }\n    submittedProgresses {\n      _id\n      totalProgress\n      quizProgress\n      courseProgress\n      createdAt\n      course {\n        _id\n        title\n      }\n    }\n    user {\n      _id\n      email\n      firstName\n      lastName\n      roles\n      badges\n    }\n  }\n'];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
