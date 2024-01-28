/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
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
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: string; output: string };
};

export type Activity = {
  __typename?: 'Activity';
  _id: Scalars['String']['output'];
  /** Activity description */
  description: Scalars['String']['output'];
  /** Activity title */
  title: Scalars['String']['output'];
  type: ActivityType;
  user: Scalars['String']['output'];
  /** Activity value. It could be represented as just numeric value, or percentage or duration, depends on the Activity type */
  value: Scalars['String']['output'];
};

/** Defines the a type for activity */
export enum ActivityType {
  Duration = 'DURATION',
  Numeric = 'NUMERIC',
  Percentage = 'PERCENTAGE',
}

export type Address = {
  __typename?: 'Address';
  _id: Scalars['String']['output'];
  /** [Should be Encrypted] City name */
  city: Scalars['String']['output'];
  /** [Should be Encrypted] Country code or name */
  country: Scalars['String']['output'];
  creditCard: CreditCard;
  /** [Should be Encrypted] Customer's phone number */
  phoneNumber: Scalars['String']['output'];
  /** [Should be Encrypted] State code or name */
  state: Scalars['String']['output'];
  /** [Should be Encrypted] Street name */
  streetLine1: Scalars['String']['output'];
  /** [Should be Encrypted] Could be apt number */
  streetLine2: Scalars['String']['output'];
  /** [Should be Encrypted] Zip code */
  zip: Scalars['String']['output'];
};

export type Answer = {
  __typename?: 'Answer';
  _id: Scalars['String']['output'];
  /** Answer's content text */
  content: Scalars['String']['output'];
  /** Stringified answer data. Set in case of REST_API question or other questions that might be used to compare user's submitted data with */
  data?: Maybe<Scalars['String']['output']>;
};

export type AnswerValidationRestApiOutput = {
  __typename?: 'AnswerValidationRestApiOutput';
  /** Stringified JSON or just test */
  body: Scalars['String']['output'];
  /** Headers array */
  headers: Array<KeyValuePair>;
  /** Status code */
  status: Scalars['Float']['output'];
};

export type Badge = {
  __typename?: 'Badge';
  _id: Scalars['String']['output'];
  course?: Maybe<Course>;
  description: Scalars['String']['output'];
  /** Icon url */
  icon: Scalars['String']['output'];
  /** Sharable link. Navigating via that link use should be able to see their Badge */
  link: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type ClaimedBadge = {
  __typename?: 'ClaimedBadge';
  _id: Scalars['String']['output'];
  badge: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: Scalars['String']['output'];
};

export type Course = {
  __typename?: 'Course';
  _id: Scalars['String']['output'];
  /** Achievement upon successful completion of course */
  badge?: Maybe<Badge>;
  /** Course description */
  description: Scalars['String']['output'];
  /** Icon url */
  icon: Scalars['String']['output'];
  /** Flag that indicates if course was already liked by user */
  isLiked: Scalars['Boolean']['output'];
  /** Defines level of skill that user gains after finishing the course */
  level: CourseLevel;
  /** Number of likes people gave to the course */
  likes: Scalars['Float']['output'];
  /** Pages included in course */
  pages: Array<Page>;
  /** Course progress */
  progress: TotalCourseProgress;
  /** Next recommended courses */
  recommendedCourses: Array<Course>;
  /** Collection of strings that describe features of the course. Help to filter courses by specific tag/s */
  tags: Array<Tag>;
  /** Course title */
  title: Scalars['String']['output'];
  type: CourseType;
  updatedAt: Scalars['DateTime']['output'];
};

/** Defines the level of the course */
export enum CourseLevel {
  Advanced = 'ADVANCED',
  Beginner = 'BEGINNER',
  Expert = 'EXPERT',
  Intermediate = 'INTERMEDIATE',
}

export type CourseLike = {
  __typename?: 'CourseLike';
  _id: Scalars['String']['output'];
  course: Scalars['String']['output'];
  user: Scalars['String']['output'];
};

export type CoursePageContentInput = {
  content: Scalars['String']['input'];
};

export type CoursePageInput = {
  content: Scalars['String']['input'];
  description: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CoursePageProgressInput = {
  /** Course id */
  course: Scalars['String']['input'];
  /** Page id */
  page: Scalars['String']['input'];
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

export type CreditCard = {
  __typename?: 'CreditCard';
  _id: Scalars['String']['output'];
  address: Address;
  /** [Should be Encrypted] Tokenized value of the credit card */
  cardToken: Scalars['String']['output'];
  /** [Should be Encrypted] Card type. Example: VISA, MASTERCARD, AMEX etc */
  cardType: Scalars['String']['output'];
  /** [Should be Encrypted] Expiration month of the credit card */
  expiryMonth: Scalars['String']['output'];
  /** [Should be Encrypted] Expiration year of the credit card */
  expiryYear: Scalars['String']['output'];
  /** [Should be Encrypted] Last four numbers of User's credit card */
  lastFour: Scalars['String']['output'];
  user: Scalars['String']['output'];
};

export type EmailInput = {
  from: Scalars['String']['input'];
  subject: Scalars['String']['input'];
  text: Scalars['String']['input'];
};

export type KeyValuePair = {
  __typename?: 'KeyValuePair';
  name: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addPage: Course;
  claimBadge: ClaimedBadge;
  createCoursePage: Page;
  createCoursePageProgress: PageProgress;
  createQuizPage: Page;
  createQuizPageProgress: PageProgress;
  deleteCourseProgresses: Scalars['Boolean']['output'];
  forgotPassword: Scalars['Boolean']['output'];
  likeCourse: CourseLike;
  login: UserOutputLogin;
  loginSocial?: Maybe<UserOutputLogin>;
  logout: Scalars['Boolean']['output'];
  register: UserOutputLogin;
  registerSocial: UserOutputLogin;
  resetPassword: User;
  sendBugReport: Scalars['String']['output'];
  sendCommunication: Scalars['String']['output'];
  updateCoursePageContent: Page;
  updateUserNames: User;
  updateUserPassword: User;
  validateRestApi: AnswerValidationRestApiOutput;
};

export type MutationAddPageArgs = {
  _id: Scalars['String']['input'];
  pageId: Scalars['String']['input'];
};

export type MutationClaimBadgeArgs = {
  badgeId: Scalars['String']['input'];
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

export type MutationDeleteCourseProgressesArgs = {
  _id: Scalars['String']['input'];
};

export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};

export type MutationLikeCourseArgs = {
  courseId: Scalars['String']['input'];
};

export type MutationLoginArgs = {
  data: UserInputLogin;
};

export type MutationLoginSocialArgs = {
  data: SocialAuthInput;
};

export type MutationRegisterArgs = {
  data: UserInputCreate;
};

export type MutationRegisterSocialArgs = {
  data: SocialAuthInput;
};

export type MutationResetPasswordArgs = {
  data: ResetPasswordInput;
};

export type MutationSendBugReportArgs = {
  data: EmailInput;
};

export type MutationSendCommunicationArgs = {
  data: EmailInput;
};

export type MutationUpdateCoursePageContentArgs = {
  _id: Scalars['String']['input'];
  data: CoursePageContentInput;
};

export type MutationUpdateUserNamesArgs = {
  data: UserInputUpdateNames;
};

export type MutationUpdateUserPasswordArgs = {
  data: UserInputUpdatePassword;
};

export type MutationValidateRestApiArgs = {
  expectedAnswerId: Scalars['String']['input'];
  stringifiedRequestData: Scalars['String']['input'];
};

export type Page = {
  __typename?: 'Page';
  _id: Scalars['String']['output'];
  content?: Maybe<Scalars['String']['output']>;
  description: Scalars['String']['output'];
  /** Page progress */
  progress?: Maybe<PageProgress>;
  /** Used in quiz pages */
  question?: Maybe<Question>;
  title: Scalars['String']['output'];
  type: CourseType;
};

export type PageProgress = {
  __typename?: 'PageProgress';
  _id: Scalars['String']['output'];
  /** Array of answers used if page is quiz */
  answers?: Maybe<Array<Scalars['String']['output']>>;
  course: Scalars['String']['output'];
  /** Stringified user's answer data when user answers complex open answer question like TEST_CASE, REST_API etc */
  data?: Maybe<Scalars['String']['output']>;
  page: Scalars['String']['output'];
  /** Type of the question */
  questionType: QuestionType;
  state: PageProgressState;
  /** Type of the course - theoretical course or quiz */
  type: CourseType;
  user: Scalars['String']['output'];
};

/** Defines whether User passed or failed or just visited current page */
export enum PageProgressState {
  Fail = 'FAIL',
  Pass = 'PASS',
}

export type Query = {
  __typename?: 'Query';
  activities: Array<Activity>;
  badges: Array<Badge>;
  claimedBadges: Array<ClaimedBadge>;
  course: Course;
  coursePublic: Course;
  courses: Array<Course>;
  coursesPublic: Array<Course>;
  creditCard?: Maybe<CreditCard>;
  submittedProgresses: Array<SubmittedProgress>;
  transactions: Array<Transaction>;
  user: User;
};

export type QueryCourseArgs = {
  _id: Scalars['String']['input'];
};

export type QueryCoursePublicArgs = {
  _id: Scalars['String']['input'];
};

export type Question = {
  __typename?: 'Question';
  _id: Scalars['String']['output'];
  /** Current answer */
  answers: Array<Answer>;
  /** Question content */
  content: Scalars['String']['output'];
  /** Answer options */
  options: Array<Answer>;
  type: QuestionType;
};

/** Defines type of the question on quiz page */
export enum QuestionType {
  BugReport = 'BUG_REPORT',
  Checklist = 'CHECKLIST',
  Coding = 'CODING',
  Graphql = 'GRAPHQL',
  MultipleChoice = 'MULTIPLE_CHOICE',
  RestApi = 'REST_API',
  SingleChoice = 'SINGLE_CHOICE',
  TestCase = 'TEST_CASE',
}

export type QuizPageInput = {
  description: Scalars['String']['input'];
  question: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type QuizPageProgressInput = {
  /** Answer ids that submitted by user only if it is single or multiple choice question */
  actualAnswers?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Course id */
  course: Scalars['String']['input'];
  /** Expected Answer ids if passed. Should be passed in case of single, multiple choice question or rest api */
  expectedAnswers?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Page id */
  page: Scalars['String']['input'];
  /** Type of the question. We use it to determine method of validation */
  questionType: QuestionType;
  /** Stringified user's answer data when user answers complex open answer question like TEST_CASE, REST_API etc */
  stringifiedData?: InputMaybe<Scalars['String']['input']>;
};

export type ResetPasswordInput = {
  password: Scalars['String']['input'];
  /** Token generated while user forgot password */
  token: Scalars['String']['input'];
};

export type SocialAuthInput = {
  /** Access Token that is received from client and should be used to get user info from social auth api */
  accessToken: Scalars['String']['input'];
  /** Provider name */
  provider: Scalars['String']['input'];
  /** Social Provider userId */
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type SubmittedProgress = {
  __typename?: 'SubmittedProgress';
  _id: Scalars['String']['output'];
  course: Course;
  /** Calculated from submitted course theory */
  courseProgress: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  /** Calculated from submitted course quiz */
  quizProgress: Scalars['Float']['output'];
  /** Calculated from course plus quiz progress */
  totalProgress: Scalars['Float']['output'];
  user: Scalars['String']['output'];
};

/** Defines the course tags */
export enum Tag {
  Ai = 'AI',
}

export type TotalCourseProgress = {
  __typename?: 'TotalCourseProgress';
  /** Total Percentage of failed pages */
  fail: Scalars['Float']['output'];
  /** Course pages count before finishing course */
  pagesLeftBeforeFinish?: Maybe<Scalars['Float']['output']>;
  /** Total Percentage of passed pages */
  pass: Scalars['Float']['output'];
  state: CourseProgressState;
  updatedAt: Scalars['DateTime']['output'];
};

export type Transaction = {
  __typename?: 'Transaction';
  _id: Scalars['String']['output'];
  /** Transaction amount */
  amount: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  creditCard: Scalars['String']['output'];
  /** Transaction currency. Could be represented as currency code like USD */
  currency: Scalars['String']['output'];
  /** External transaction. Refer to transaction stored on side of Payment Processes like Stripe */
  externalId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String']['output'];
  email: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  /** User roles. User - simple platform user. Admin - user with access to course editing */
  roles: Array<Scalars['String']['output']>;
};

export type UserBaseModel = {
  _id: Scalars['String']['output'];
  email: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  roles: Array<Scalars['String']['output']>;
};

export type UserInputCreate = {
  email: Scalars['String']['input'];
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
};

export type UserInputLogin = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type UserInputUpdateNames = {
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
};

export type UserInputUpdatePassword = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};

export type UserOutputLogin = UserBaseModel & {
  __typename?: 'UserOutputLogin';
  _id: Scalars['String']['output'];
  access_token: Scalars['String']['output'];
  email: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  roles: Array<Scalars['String']['output']>;
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: { __typename?: 'UserOutputLogin'; access_token: string };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: 'Mutation'; logout: boolean };

export type LoginSocialMutationVariables = Exact<{
  accessToken: Scalars['String']['input'];
  provider: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
}>;

export type LoginSocialMutation = {
  __typename?: 'Mutation';
  loginSocial?: { __typename?: 'UserOutputLogin'; access_token: string } | null;
};

export type RegisterSocialMutationVariables = Exact<{
  accessToken: Scalars['String']['input'];
  provider: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
}>;

export type RegisterSocialMutation = {
  __typename?: 'Mutation';
  registerSocial: { __typename?: 'UserOutputLogin'; access_token: string };
};

export type RegisterMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
}>;

export type RegisterMutation = {
  __typename?: 'Mutation';
  register: { __typename?: 'UserOutputLogin'; access_token: string };
};

export type CreateQuizPageProgressMutationVariables = Exact<{
  data: QuizPageProgressInput;
}>;

export type CreateQuizPageProgressMutation = {
  __typename?: 'Mutation';
  createQuizPageProgress: {
    __typename?: 'PageProgress';
    state: PageProgressState;
    page: string;
    answers?: Array<string> | null;
    data?: string | null;
  };
};

export type CreateCoursePageProgressMutationVariables = Exact<{
  page: Scalars['String']['input'];
  course: Scalars['String']['input'];
}>;

export type CreateCoursePageProgressMutation = {
  __typename?: 'Mutation';
  createCoursePageProgress: { __typename?: 'PageProgress'; _id: string };
};

export type UpdateCoursePageContentMutationVariables = Exact<{
  _id: Scalars['String']['input'];
  content: Scalars['String']['input'];
}>;

export type UpdateCoursePageContentMutation = {
  __typename?: 'Mutation';
  updateCoursePageContent: { __typename?: 'Page'; content?: string | null };
};

export type ResetPasswordMutationVariables = Exact<{
  data: ResetPasswordInput;
}>;

export type ResetPasswordMutation = {
  __typename?: 'Mutation';
  resetPassword: { __typename?: 'User'; _id: string };
};

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;

export type ForgotPasswordMutation = {
  __typename?: 'Mutation';
  forgotPassword: boolean;
};

export type UpdateUserNamesMutationVariables = Exact<{
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
}>;

export type UpdateUserNamesMutation = {
  __typename?: 'Mutation';
  updateUserNames: {
    __typename?: 'User';
    firstName?: string | null;
    lastName?: string | null;
  };
};

export type UpdateUserPasswordMutationVariables = Exact<{
  oldPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
}>;

export type UpdateUserPasswordMutation = {
  __typename?: 'Mutation';
  updateUserPassword: { __typename?: 'User'; _id: string };
};

export type ClaimBadgeMutationVariables = Exact<{
  badgeId: Scalars['String']['input'];
}>;

export type ClaimBadgeMutation = {
  __typename?: 'Mutation';
  claimBadge: {
    __typename?: 'ClaimedBadge';
    _id: string;
    badge: string;
    createdAt: string;
  };
};

export type DeleteCourseProgressesMutationVariables = Exact<{
  _id: Scalars['String']['input'];
}>;

export type DeleteCourseProgressesMutation = {
  __typename?: 'Mutation';
  deleteCourseProgresses: boolean;
};

export type ValidateRestApiMutationVariables = Exact<{
  stringifiedRequestData: Scalars['String']['input'];
  expectedAnswerId: Scalars['String']['input'];
}>;

export type ValidateRestApiMutation = {
  __typename?: 'Mutation';
  validateRestApi: {
    __typename?: 'AnswerValidationRestApiOutput';
    status: number;
    body: string;
    headers: Array<{
      __typename?: 'KeyValuePair';
      name: string;
      value: string;
    }>;
  };
};

export type SendBugReportMutationVariables = Exact<{
  data: EmailInput;
}>;

export type SendBugReportMutation = {
  __typename?: 'Mutation';
  sendBugReport: string;
};

export type SendCommunicationMutationVariables = Exact<{
  data: EmailInput;
}>;

export type SendCommunicationMutation = {
  __typename?: 'Mutation';
  sendCommunication: string;
};

export type LikeCourseMutationVariables = Exact<{
  courseId: Scalars['String']['input'];
}>;

export type LikeCourseMutation = {
  __typename?: 'Mutation';
  likeCourse: { __typename?: 'CourseLike'; _id: string };
};

export type GetAllCoursesQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllCoursesQuery = {
  __typename?: 'Query';
  courses: Array<{
    __typename?: 'Course';
    _id: string;
    title: string;
    type: CourseType;
    level: CourseLevel;
    description: string;
    likes: number;
    isLiked: boolean;
    tags: Array<Tag>;
    pages: Array<{ __typename?: 'Page'; _id: string; type: CourseType }>;
    recommendedCourses: Array<{
      __typename?: 'Course';
      _id: string;
      title: string;
      level: CourseLevel;
      progress: {
        __typename?: 'TotalCourseProgress';
        state: CourseProgressState;
      };
    }>;
    progress: {
      __typename?: 'TotalCourseProgress';
      pass: number;
      fail: number;
      state: CourseProgressState;
      updatedAt: string;
    };
    badge?: { __typename?: 'Badge'; _id: string } | null;
  }>;
};

export type GetAllCoursesPublicQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllCoursesPublicQuery = {
  __typename?: 'Query';
  coursesPublic: Array<{
    __typename?: 'Course';
    _id: string;
    title: string;
    type: CourseType;
    level: CourseLevel;
    description: string;
    likes: number;
    tags: Array<Tag>;
    pages: Array<{ __typename?: 'Page'; _id: string; type: CourseType }>;
    recommendedCourses: Array<{
      __typename?: 'Course';
      _id: string;
      title: string;
      level: CourseLevel;
    }>;
  }>;
};

export type GetAllCoursesPublicMetaDataQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetAllCoursesPublicMetaDataQuery = {
  __typename?: 'Query';
  coursesPublic: Array<{
    __typename?: 'Course';
    _id: string;
    updatedAt: string;
    title: string;
    type: CourseType;
    level: CourseLevel;
    description: string;
  }>;
};

export type GetCourseQueryVariables = Exact<{
  _id: Scalars['String']['input'];
}>;

export type GetCourseQuery = {
  __typename?: 'Query';
  course: {
    __typename?: 'Course';
    _id: string;
    title: string;
    type: CourseType;
    level: CourseLevel;
    description: string;
    likes: number;
    isLiked: boolean;
    progress: {
      __typename?: 'TotalCourseProgress';
      pagesLeftBeforeFinish?: number | null;
      pass: number;
      fail: number;
      state: CourseProgressState;
      updatedAt: string;
    };
    badge?: { __typename?: 'Badge'; _id: string } | null;
    pages: Array<{
      __typename?: 'Page';
      _id: string;
      title: string;
      type: CourseType;
      description: string;
      content?: string | null;
      question?: {
        __typename?: 'Question';
        content: string;
        type: QuestionType;
        answers: Array<{ __typename?: 'Answer'; _id: string; content: string }>;
        options: Array<{ __typename?: 'Answer'; _id: string; content: string }>;
      } | null;
      progress?: {
        __typename?: 'PageProgress';
        _id: string;
        state: PageProgressState;
        answers?: Array<string> | null;
        data?: string | null;
      } | null;
    }>;
    recommendedCourses: Array<{
      __typename?: 'Course';
      _id: string;
      title: string;
      level: CourseLevel;
      progress: {
        __typename?: 'TotalCourseProgress';
        state: CourseProgressState;
      };
    }>;
  };
};

export type GetCoursePublicMetaDataQueryVariables = Exact<{
  _id: Scalars['String']['input'];
}>;

export type GetCoursePublicMetaDataQuery = {
  __typename?: 'Query';
  coursePublic: {
    __typename?: 'Course';
    _id: string;
    title: string;
    type: CourseType;
    level: CourseLevel;
    description: string;
  };
};

export type GetUserQueryVariables = Exact<{ [key: string]: never }>;

export type GetUserQuery = {
  __typename?: 'Query';
  user: {
    __typename?: 'User';
    _id: string;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
    roles: Array<string>;
  };
};

export type GetClaimedBadgesQueryVariables = Exact<{ [key: string]: never }>;

export type GetClaimedBadgesQuery = {
  __typename?: 'Query';
  claimedBadges: Array<{
    __typename?: 'ClaimedBadge';
    _id: string;
    badge: string;
    user: string;
    createdAt: string;
  }>;
};

export type GetAllAndClaimedBadgesQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetAllAndClaimedBadgesQuery = {
  __typename?: 'Query';
  badges: Array<{
    __typename?: 'Badge';
    _id: string;
    title: string;
    description: string;
    icon: string;
    link: string;
    course?: { __typename?: 'Course'; _id: string; title: string } | null;
  }>;
  claimedBadges: Array<{
    __typename?: 'ClaimedBadge';
    _id: string;
    badge: string;
    createdAt: string;
  }>;
};

export type GetSubmittedUserProgressesUserQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetSubmittedUserProgressesUserQuery = {
  __typename?: 'Query';
  submittedProgresses: Array<{
    __typename?: 'SubmittedProgress';
    _id: string;
    totalProgress: number;
    quizProgress: number;
    courseProgress: number;
    createdAt: string;
    course: {
      __typename?: 'Course';
      _id: string;
      title: string;
      level: CourseLevel;
      progress: {
        __typename?: 'TotalCourseProgress';
        state: CourseProgressState;
        pass: number;
        fail: number;
      };
    };
  }>;
};

export type GetCreditCardQueryVariables = Exact<{ [key: string]: never }>;

export type GetCreditCardQuery = {
  __typename?: 'Query';
  creditCard?: {
    __typename?: 'CreditCard';
    _id: string;
    cardToken: string;
    lastFour: string;
    expiryMonth: string;
    expiryYear: string;
    cardType: string;
    user: string;
    address: {
      __typename?: 'Address';
      phoneNumber: string;
      streetLine1: string;
      streetLine2: string;
      city: string;
      country: string;
      zip: string;
    };
  } | null;
};

export type GetUserActivitiesQueryVariables = Exact<{ [key: string]: never }>;

export type GetUserActivitiesQuery = {
  __typename?: 'Query';
  activities: Array<{
    __typename?: 'Activity';
    _id: string;
    title: string;
    description: string;
    value: string;
  }>;
};

export type GetBillingTransactionsQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetBillingTransactionsQuery = {
  __typename?: 'Query';
  transactions: Array<{
    __typename?: 'Transaction';
    _id: string;
    createdAt: string;
  }>;
};

export const LoginDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'Login' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'email' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'password' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'login' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'email' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'email' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'password' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'password' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'access_token' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'Logout' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'logout' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const LoginSocialDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'LoginSocial' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'accessToken' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'provider' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'userId' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'loginSocial' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'accessToken' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'accessToken' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'provider' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'provider' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'userId' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'userId' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'access_token' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LoginSocialMutation, LoginSocialMutationVariables>;
export const RegisterSocialDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'RegisterSocial' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'accessToken' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'provider' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'userId' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'registerSocial' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'accessToken' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'accessToken' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'provider' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'provider' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'userId' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'userId' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'access_token' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  RegisterSocialMutation,
  RegisterSocialMutationVariables
>;
export const RegisterDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'Register' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'email' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'password' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'firstName' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'lastName' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'register' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'email' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'email' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'password' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'password' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'firstName' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'firstName' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'lastName' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'lastName' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'access_token' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const CreateQuizPageProgressDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateQuizPageProgress' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'QuizPageProgressInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createQuizPageProgress' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                { kind: 'Field', name: { kind: 'Name', value: 'page' } },
                { kind: 'Field', name: { kind: 'Name', value: 'answers' } },
                { kind: 'Field', name: { kind: 'Name', value: 'data' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateQuizPageProgressMutation,
  CreateQuizPageProgressMutationVariables
>;
export const CreateCoursePageProgressDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateCoursePageProgress' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'page' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'course' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createCoursePageProgress' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'page' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'page' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'course' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'course' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateCoursePageProgressMutation,
  CreateCoursePageProgressMutationVariables
>;
export const UpdateCoursePageContentDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateCoursePageContent' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: '_id' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'content' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateCoursePageContent' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: '_id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: '_id' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'content' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'content' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'content' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateCoursePageContentMutation,
  UpdateCoursePageContentMutationVariables
>;
export const ResetPasswordDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ResetPassword' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'ResetPasswordInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'resetPassword' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ResetPasswordMutation,
  ResetPasswordMutationVariables
>;
export const ForgotPasswordDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ForgotPassword' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'email' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'forgotPassword' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'email' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'email' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables
>;
export const UpdateUserNamesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateUserNames' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'firstName' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'lastName' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateUserNames' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'firstName' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'firstName' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'lastName' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'lastName' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateUserNamesMutation,
  UpdateUserNamesMutationVariables
>;
export const UpdateUserPasswordDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateUserPassword' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'oldPassword' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'newPassword' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateUserPassword' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'oldPassword' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'oldPassword' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'newPassword' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'newPassword' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateUserPasswordMutation,
  UpdateUserPasswordMutationVariables
>;
export const ClaimBadgeDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ClaimBadge' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'badgeId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'claimBadge' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'badgeId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'badgeId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'badge' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ClaimBadgeMutation, ClaimBadgeMutationVariables>;
export const DeleteCourseProgressesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteCourseProgresses' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: '_id' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteCourseProgresses' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: '_id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: '_id' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteCourseProgressesMutation,
  DeleteCourseProgressesMutationVariables
>;
export const ValidateRestApiDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ValidateRestApi' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'stringifiedRequestData' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'expectedAnswerId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'validateRestApi' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'stringifiedRequestData' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'stringifiedRequestData' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'expectedAnswerId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'expectedAnswerId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'headers' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'body' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ValidateRestApiMutation,
  ValidateRestApiMutationVariables
>;
export const SendBugReportDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SendBugReport' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'EmailInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'sendBugReport' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SendBugReportMutation,
  SendBugReportMutationVariables
>;
export const SendCommunicationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SendCommunication' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'EmailInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'sendCommunication' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SendCommunicationMutation,
  SendCommunicationMutationVariables
>;
export const LikeCourseDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'LikeCourse' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'courseId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'likeCourse' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'courseId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'courseId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LikeCourseMutation, LikeCourseMutationVariables>;
export const GetAllCoursesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetAllCourses' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'courses' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'level' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'likes' } },
                { kind: 'Field', name: { kind: 'Name', value: 'isLiked' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'pages' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'recommendedCourses' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'level' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'progress' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'state' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'tags' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'progress' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'pass' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'fail' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'updatedAt' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'badge' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetAllCoursesQuery, GetAllCoursesQueryVariables>;
export const GetAllCoursesPublicDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetAllCoursesPublic' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'coursesPublic' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'level' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'likes' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'pages' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'tags' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'recommendedCourses' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'level' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetAllCoursesPublicQuery,
  GetAllCoursesPublicQueryVariables
>;
export const GetAllCoursesPublicMetaDataDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetAllCoursesPublicMetaData' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'coursesPublic' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'level' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetAllCoursesPublicMetaDataQuery,
  GetAllCoursesPublicMetaDataQueryVariables
>;
export const GetCourseDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCourse' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: '_id' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'course' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: '_id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: '_id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'level' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'likes' } },
                { kind: 'Field', name: { kind: 'Name', value: 'isLiked' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'progress' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'pagesLeftBeforeFinish' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'pass' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'fail' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'updatedAt' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'badge' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'pages' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'description' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'content' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'question' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'content' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'type' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'answers' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: '_id' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'content' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'options' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: '_id' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'content' },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'progress' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: '_id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'state' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'answers' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'data' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'recommendedCourses' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'level' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'progress' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'state' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetCourseQuery, GetCourseQueryVariables>;
export const GetCoursePublicMetaDataDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCoursePublicMetaData' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: '_id' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'coursePublic' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: '_id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: '_id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'level' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetCoursePublicMetaDataQuery,
  GetCoursePublicMetaDataQueryVariables
>;
export const GetUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetUser' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'user' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'roles' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;
export const GetClaimedBadgesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetClaimedBadges' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'claimedBadges' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'badge' } },
                { kind: 'Field', name: { kind: 'Name', value: 'user' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetClaimedBadgesQuery,
  GetClaimedBadgesQueryVariables
>;
export const GetAllAndClaimedBadgesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetAllAndClaimedBadges' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'badges' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'icon' } },
                { kind: 'Field', name: { kind: 'Name', value: 'link' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'course' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'claimedBadges' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'badge' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetAllAndClaimedBadgesQuery,
  GetAllAndClaimedBadgesQueryVariables
>;
export const GetSubmittedUserProgressesUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetSubmittedUserProgressesUser' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'submittedProgresses' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'totalProgress' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'quizProgress' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'courseProgress' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'course' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'level' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'progress' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'state' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'pass' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'fail' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetSubmittedUserProgressesUserQuery,
  GetSubmittedUserProgressesUserQueryVariables
>;
export const GetCreditCardDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCreditCard' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'creditCard' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'cardToken' } },
                { kind: 'Field', name: { kind: 'Name', value: 'lastFour' } },
                { kind: 'Field', name: { kind: 'Name', value: 'expiryMonth' } },
                { kind: 'Field', name: { kind: 'Name', value: 'expiryYear' } },
                { kind: 'Field', name: { kind: 'Name', value: 'cardType' } },
                { kind: 'Field', name: { kind: 'Name', value: 'user' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'address' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'phoneNumber' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'streetLine1' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'streetLine2' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'country' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'zip' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetCreditCardQuery, GetCreditCardQueryVariables>;
export const GetUserActivitiesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetUserActivities' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'activities' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetUserActivitiesQuery,
  GetUserActivitiesQueryVariables
>;
export const GetBillingTransactionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetBillingTransactions' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'transactions' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetBillingTransactionsQuery,
  GetBillingTransactionsQueryVariables
>;
