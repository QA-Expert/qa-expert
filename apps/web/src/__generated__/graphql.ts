/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type Answer = {
  __typename?: 'Answer';
  _id: Scalars['String'];
  content: Scalars['String'];
};

export type Badge = {
  __typename?: 'Badge';
  _id: Scalars['String'];
  course?: Maybe<Course>;
  description: Scalars['String'];
  icon: Scalars['String'];
  link: Scalars['String'];
  title: Scalars['String'];
};

export type Course = {
  __typename?: 'Course';
  _id: Scalars['String'];
  badge?: Maybe<Badge>;
  description: Scalars['String'];
  icon: Scalars['String'];
  pages: Array<Page>;
  progress: CourseProgress;
  title: Scalars['String'];
  type: CourseType;
};

export type CoursePageContentInput = {
  content: Scalars['String'];
};

export type CoursePageInput = {
  content: Scalars['String'];
  description: Scalars['String'];
  title: Scalars['String'];
};

export type CoursePageProgressInput = {
  course: Scalars['String'];
  page: Scalars['String'];
};

export type CourseProgress = {
  __typename?: 'CourseProgress';
  fail: Scalars['Float'];
  pass: Scalars['Float'];
  state: CourseProgressState;
  submittedAt: Scalars['DateTime'];
};

/** Defines the state of course progress */
export enum CourseProgressState {
  Fail = 'FAIL',
  InProgress = 'IN_PROGRESS',
  Pass = 'PASS',
}

/** Defines the type of the course */
export enum CourseType {
  Course = 'COURSE',
  Quiz = 'QUIZ',
}

export type Mutation = {
  __typename?: 'Mutation';
  addPage: Course;
  claimBadge: User;
  createCoursePage: Page;
  createCoursePageProgress: PageProgress;
  createQuizPage: Page;
  createQuizPageProgress: PageProgress;
  deletePagesProgresses: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  login: UserOutputLogin;
  logout: Scalars['Boolean'];
  register: UserOutputLogin;
  resetPassword: User;
  updateCoursePageContent: Page;
  updateUserNames: User;
  updateUserPassword: User;
};

export type MutationAddPageArgs = {
  _id: Scalars['String'];
  pageId: Scalars['String'];
};

export type MutationClaimBadgeArgs = {
  badgeId: Scalars['String'];
};

export type MutationCreateCoursePageArgs = {
  data: CoursePageInput;
};

export type MutationCreateCoursePageProgressArgs = {
  data: CoursePageProgressInput;
};

export type MutationCreateQuizPageArgs = {
  data: QuizPageInput;
};

export type MutationCreateQuizPageProgressArgs = {
  data: QuizPageProgressInput;
};

export type MutationDeletePagesProgressesArgs = {
  pages: Array<Scalars['String']>;
};

export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};

export type MutationLoginArgs = {
  data: UserInputLogin;
};

export type MutationRegisterArgs = {
  data: UserInputCreate;
};

export type MutationResetPasswordArgs = {
  data: ResetPasswordInput;
};

export type MutationUpdateCoursePageContentArgs = {
  _id: Scalars['String'];
  data: CoursePageContentInput;
};

export type MutationUpdateUserNamesArgs = {
  data: UserInputUpdateNames;
};

export type MutationUpdateUserPasswordArgs = {
  data: UserInputUpdatePassword;
};

export type Page = {
  __typename?: 'Page';
  _id: Scalars['String'];
  content?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  progress?: Maybe<PageProgress>;
  question?: Maybe<Question>;
  title: Scalars['String'];
  type: CourseType;
};

export type PageProgress = {
  __typename?: 'PageProgress';
  _id: Scalars['String'];
  answers?: Maybe<Array<Scalars['String']>>;
  course: Scalars['String'];
  page: Scalars['String'];
  state: PageProgressState;
  type: CourseType;
  user: Scalars['String'];
};

/** Defines whether User passed or failed or just visited current page */
export enum PageProgressState {
  Fail = 'FAIL',
  Pass = 'PASS',
}

export type Query = {
  __typename?: 'Query';
  badges: Array<Badge>;
  course: Course;
  courses: Array<Course>;
  user: User;
};

export type QueryCourseArgs = {
  _id: Scalars['String'];
};

export type Question = {
  __typename?: 'Question';
  _id: Scalars['String'];
  answers: Array<Answer>;
  content: Scalars['String'];
  options: Array<Answer>;
};

export type QuizPageInput = {
  description: Scalars['String'];
  question: Scalars['String'];
  title: Scalars['String'];
};

export type QuizPageProgressInput = {
  answers: Array<Scalars['String']>;
  course: Scalars['String'];
  page: Scalars['String'];
  state: PageProgressState;
};

export type ResetPasswordInput = {
  password: Scalars['String'];
  token: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  badges?: Maybe<Array<Scalars['String']>>;
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  roles: Array<Scalars['String']>;
};

export type UserBaseModel = {
  _id: Scalars['String'];
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
};

export type UserInputCreate = {
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
};

export type UserInputLogin = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserInputUpdateNames = {
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
};

export type UserInputUpdatePassword = {
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};

export type UserOutputLogin = UserBaseModel & {
  __typename?: 'UserOutputLogin';
  _id: Scalars['String'];
  access_token: Scalars['String'];
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
};
