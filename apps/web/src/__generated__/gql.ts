/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
  '\n  fragment QuestionFragment on Question {\n    content\n    answers {\n      _id\n      content\n    }\n    options {\n      _id\n      content\n    }\n  }\n':
    types.QuestionFragmentFragmentDoc,
  '\n  fragment CourseHeadingFragment on Course {\n    _id\n    title\n    type\n    description\n  }\n':
    types.CourseHeadingFragmentFragmentDoc,
  '\n  \n  fragment PageFragment on Page {\n    _id\n    title\n    type\n    description\n    content\n    question {\n      ...QuestionFragment\n    }\n    progress {\n      _id\n      state\n      answers\n    }\n  }\n':
    types.PageFragmentFragmentDoc,
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
  '\n  \n  query GetAllCourses {\n    courses {\n      ...CourseHeadingFragment\n      progress {\n        pass\n        fail\n        state\n        submittedAt\n      }\n      badge {\n        _id\n      }\n    }\n  }\n':
    types.GetAllCoursesDocument,
  '\n  \n  \n  query GetCourse($_id: String!) {\n    course(_id: $_id) {\n      ...CourseHeadingFragment\n      pages {\n        ...PageFragment\n      }\n    }\n  }\n':
    types.GetCourseDocument,
  '\n  query GetUser {\n    user {\n      _id\n      email\n      firstName\n      lastName\n      roles\n      badges\n    }\n  }\n':
    types.GetUserDocument,
  '\n  query GetBadges {\n    badges {\n      _id\n      title\n      description\n      icon\n      link\n      course {\n        _id\n        title\n      }\n    }\n  }\n':
    types.GetBadgesDocument,
};

export function gql(
  source: '\n  fragment QuestionFragment on Question {\n    content\n    answers {\n      _id\n      content\n    }\n    options {\n      _id\n      content\n    }\n  }\n',
): typeof documents['\n  fragment QuestionFragment on Question {\n    content\n    answers {\n      _id\n      content\n    }\n    options {\n      _id\n      content\n    }\n  }\n'];
export function gql(
  source: '\n  fragment CourseHeadingFragment on Course {\n    _id\n    title\n    type\n    description\n  }\n',
): typeof documents['\n  fragment CourseHeadingFragment on Course {\n    _id\n    title\n    type\n    description\n  }\n'];
export function gql(
  source: '\n  \n  fragment PageFragment on Page {\n    _id\n    title\n    type\n    description\n    content\n    question {\n      ...QuestionFragment\n    }\n    progress {\n      _id\n      state\n      answers\n    }\n  }\n',
): typeof documents['\n  \n  fragment PageFragment on Page {\n    _id\n    title\n    type\n    description\n    content\n    question {\n      ...QuestionFragment\n    }\n    progress {\n      _id\n      state\n      answers\n    }\n  }\n'];
export function gql(
  source: '\n  mutation Login($email: String!, $password: String!) {\n    login(data: { email: $email, password: $password }) {\n      access_token\n    }\n  }\n',
): typeof documents['\n  mutation Login($email: String!, $password: String!) {\n    login(data: { email: $email, password: $password }) {\n      access_token\n    }\n  }\n'];
export function gql(
  source: '\n  mutation Logout {\n    logout\n  }\n',
): typeof documents['\n  mutation Logout {\n    logout\n  }\n'];
export function gql(
  source: '\n  mutation Register(\n    $email: String!\n    $password: String!\n    $firstName: String\n    $lastName: String\n  ) {\n    register(\n      data: {\n        email: $email\n        password: $password\n        firstName: $firstName\n        lastName: $lastName\n      }\n    ) {\n      access_token\n    }\n  }\n',
): typeof documents['\n  mutation Register(\n    $email: String!\n    $password: String!\n    $firstName: String\n    $lastName: String\n  ) {\n    register(\n      data: {\n        email: $email\n        password: $password\n        firstName: $firstName\n        lastName: $lastName\n      }\n    ) {\n      access_token\n    }\n  }\n'];
export function gql(
  source: '\n  mutation CreateQuizPageProgress(\n    $state: PageProgressState!\n    $page: String!\n    $course: String!\n    $answers: [String!]!\n  ) {\n    createQuizPageProgress(\n      data: { state: $state, page: $page, course: $course, answers: $answers }\n    ) {\n      state\n      page\n      answers\n    }\n  }\n',
): typeof documents['\n  mutation CreateQuizPageProgress(\n    $state: PageProgressState!\n    $page: String!\n    $course: String!\n    $answers: [String!]!\n  ) {\n    createQuizPageProgress(\n      data: { state: $state, page: $page, course: $course, answers: $answers }\n    ) {\n      state\n      page\n      answers\n    }\n  }\n'];
export function gql(
  source: '\n  mutation CreateCoursePageProgress($page: String!, $course: String!) {\n    createCoursePageProgress(data: { page: $page, course: $course }) {\n      _id\n    }\n  }\n',
): typeof documents['\n  mutation CreateCoursePageProgress($page: String!, $course: String!) {\n    createCoursePageProgress(data: { page: $page, course: $course }) {\n      _id\n    }\n  }\n'];
export function gql(
  source: '\n  mutation updateCoursePageContent($_id: String!, $content: String!) {\n    updateCoursePageContent(_id: $_id, data: { content: $content }) {\n      content\n    }\n  }\n',
): typeof documents['\n  mutation updateCoursePageContent($_id: String!, $content: String!) {\n    updateCoursePageContent(_id: $_id, data: { content: $content }) {\n      content\n    }\n  }\n'];
export function gql(
  source: '\n  mutation ResetPassword($data: ResetPasswordInput!) {\n    resetPassword(data: $data) {\n      _id\n    }\n  }\n',
): typeof documents['\n  mutation ResetPassword($data: ResetPasswordInput!) {\n    resetPassword(data: $data) {\n      _id\n    }\n  }\n'];
export function gql(
  source: '\n  mutation ForgotPassword($email: String!) {\n    forgotPassword(email: $email)\n  }\n',
): typeof documents['\n  mutation ForgotPassword($email: String!) {\n    forgotPassword(email: $email)\n  }\n'];
export function gql(
  source: '\n  mutation UpdateUserNames($firstName: String, $lastName: String) {\n    updateUserNames(data: { firstName: $firstName, lastName: $lastName }) {\n      firstName\n      lastName\n    }\n  }\n',
): typeof documents['\n  mutation UpdateUserNames($firstName: String, $lastName: String) {\n    updateUserNames(data: { firstName: $firstName, lastName: $lastName }) {\n      firstName\n      lastName\n    }\n  }\n'];
export function gql(
  source: '\n  mutation UpdateUserPassword($oldPassword: String!, $newPassword: String!) {\n    updateUserPassword(\n      data: { oldPassword: $oldPassword, newPassword: $newPassword }\n    ) {\n      _id\n    }\n  }\n',
): typeof documents['\n  mutation UpdateUserPassword($oldPassword: String!, $newPassword: String!) {\n    updateUserPassword(\n      data: { oldPassword: $oldPassword, newPassword: $newPassword }\n    ) {\n      _id\n    }\n  }\n'];
export function gql(
  source: '\n  mutation ClaimBadge($badgeId: String!) {\n    claimBadge(badgeId: $badgeId) {\n      badges\n    }\n  }\n',
): typeof documents['\n  mutation ClaimBadge($badgeId: String!) {\n    claimBadge(badgeId: $badgeId) {\n      badges\n    }\n  }\n'];
export function gql(
  source: '\n  \n  query GetAllCourses {\n    courses {\n      ...CourseHeadingFragment\n      progress {\n        pass\n        fail\n        state\n        submittedAt\n      }\n      badge {\n        _id\n      }\n    }\n  }\n',
): typeof documents['\n  \n  query GetAllCourses {\n    courses {\n      ...CourseHeadingFragment\n      progress {\n        pass\n        fail\n        state\n        submittedAt\n      }\n      badge {\n        _id\n      }\n    }\n  }\n'];
export function gql(
  source: '\n  \n  \n  query GetCourse($_id: String!) {\n    course(_id: $_id) {\n      ...CourseHeadingFragment\n      pages {\n        ...PageFragment\n      }\n    }\n  }\n',
): typeof documents['\n  \n  \n  query GetCourse($_id: String!) {\n    course(_id: $_id) {\n      ...CourseHeadingFragment\n      pages {\n        ...PageFragment\n      }\n    }\n  }\n'];
export function gql(
  source: '\n  query GetUser {\n    user {\n      _id\n      email\n      firstName\n      lastName\n      roles\n      badges\n    }\n  }\n',
): typeof documents['\n  query GetUser {\n    user {\n      _id\n      email\n      firstName\n      lastName\n      roles\n      badges\n    }\n  }\n'];
export function gql(
  source: '\n  query GetBadges {\n    badges {\n      _id\n      title\n      description\n      icon\n      link\n      course {\n        _id\n        title\n      }\n    }\n  }\n',
): typeof documents['\n  query GetBadges {\n    badges {\n      _id\n      title\n      description\n      icon\n      link\n      course {\n        _id\n        title\n      }\n    }\n  }\n'];

export function gql(source: string): unknown;
export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
