
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum QuizPageProgressState {
    FAIL = "FAIL",
    PASS = "PASS",
    VISITED = "VISITED"
}

export enum QuizType {
    PRACTICE = "PRACTICE",
    QUESTIONEER = "QUESTIONEER"
}

export class CourseProgressInput {
    courseId: string;
    coursePageId: string;
    userId: string;
}

export class QuizProgressInput {
    answerIds?: Nullable<string[]>;
    quizId: string;
    quizPageId: string;
    state: QuizPageProgressState;
    userId?: Nullable<string>;
}

export class UserInputCreate {
    email: string;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    password: string;
}

export class UserInputLogin {
    email: string;
    password: string;
}

export interface Base {
    id: string;
}

export interface BaseContent extends Base {
    description: string;
    id: string;
    title: string;
}

export interface UserBaseModel {
    email: string;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
}

export class Answer implements Base {
    content: string;
    id: string;
}

export class Course implements Base, BaseContent {
    coursePages: CoursePage[];
    description: string;
    icon: string;
    id: string;
    quizzes: Quiz[];
    title: string;
}

export class CoursePage implements Base, BaseContent {
    content: string;
    description: string;
    id: string;
    title: string;
}

export class CourseProgress implements Base {
    courseId: string;
    coursePageId: string;
    id: string;
    userId: string;
}

export abstract class IMutation {
    abstract createCourseProgress(data: CourseProgressInput): CourseProgress | Promise<CourseProgress>;

    abstract createQuizProgress(data: QuizProgressInput): QuizProgress | Promise<QuizProgress>;

    abstract login(data: UserInputLogin): UserOutputLogin | Promise<UserOutputLogin>;

    abstract logout(): boolean | Promise<boolean>;

    abstract register(data: UserInputCreate): UserOutputLogin | Promise<UserOutputLogin>;
}

export abstract class IQuery {
    abstract course(id: string): Course | Promise<Course>;

    abstract courseProgresses(courseId: string): CourseProgress[] | Promise<CourseProgress[]>;

    abstract courses(): Course[] | Promise<Course[]>;

    abstract quiz(id: string): Quiz | Promise<Quiz>;

    abstract quizzes(): Quiz[] | Promise<Quiz[]>;

    abstract user(): User | Promise<User>;
}

export class Question implements Base {
    answers: Answer[];
    content: string;
    id: string;
    options: Answer[];
}

export class Quiz implements Base, BaseContent {
    courses: Course[];
    description: string;
    expectedResult: string;
    icon: string;
    id: string;
    quizPages: QuizPage[];
    title: string;
    type: QuizType;
}

export class QuizPage implements Base, BaseContent {
    description: string;
    id: string;
    progresses: QuizProgress[];
    question: Question;
    title: string;
}

export class QuizProgress implements Base {
    answerIds: string[];
    id: string;
    quizId: string;
    quizPageId: string;
    state: QuizPageProgressState;
    userId: string;
}

export class User implements Base {
    email: string;
    firstName?: Nullable<string>;
    id: string;
    lastName?: Nullable<string>;
}

export class UserOutputLogin implements UserBaseModel {
    access_token: string;
    email: string;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
}

type Nullable<T> = T | null;
