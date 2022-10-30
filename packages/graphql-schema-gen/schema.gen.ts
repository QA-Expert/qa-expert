
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum CourseType {
    COURSE = "COURSE",
    QUIZ = "QUIZ"
}

export enum PageProgressState {
    FAIL = "FAIL",
    PASS = "PASS"
}

export class CoursePageProgressInput {
    page: string;
}

export class NewCoursePageInput {
    content: string;
    description: string;
    title: string;
}

export class QuizPageInput {
    description: string;
    question: string;
    title: string;
}

export class QuizPageProgressInput {
    answers: string[];
    page: string;
    state: PageProgressState;
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

export interface UserBaseModel {
    _id: string;
    email: string;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
}

export class Answer {
    _id: string;
    content: string;
}

export class Course {
    _id: string;
    description: string;
    icon: string;
    pages: Page[];
    progress: ProgressPercentage;
    title: string;
}

export abstract class IMutation {
    abstract addPage(_id: string, pageId: string): Course | Promise<Course>;

    abstract createCoursePage(data: NewCoursePageInput): Page | Promise<Page>;

    abstract createCoursePageProgress(data: CoursePageProgressInput): PageProgress | Promise<PageProgress>;

    abstract createQuizPage(data: QuizPageInput): Page | Promise<Page>;

    abstract createQuizPageProgress(data: QuizPageProgressInput): PageProgress | Promise<PageProgress>;

    abstract login(data: UserInputLogin): UserOutputLogin | Promise<UserOutputLogin>;

    abstract logout(): boolean | Promise<boolean>;

    abstract register(data: UserInputCreate): UserOutputLogin | Promise<UserOutputLogin>;
}

export class Page {
    _id: string;
    content?: Nullable<string>;
    description: string;
    progress?: Nullable<PageProgress>;
    question?: Nullable<Question>;
    title: string;
    type: CourseType;
}

export class PageProgress {
    _id: string;
    answers?: Nullable<string[]>;
    page: string;
    state: PageProgressState;
    type: CourseType;
    user: string;
}

export class ProgressPercentage {
    fail: number;
    pass: number;
}

export abstract class IQuery {
    abstract course(_id: string): Course | Promise<Course>;

    abstract courses(): Course[] | Promise<Course[]>;

    abstract user(): User | Promise<User>;
}

export class Question {
    _id: string;
    answers: Answer[];
    content: string;
    options: Answer[];
}

export class User {
    _id: string;
    email: string;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    roles: string[];
}

export class UserOutputLogin implements UserBaseModel {
    _id: string;
    access_token: string;
    email: string;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
}

type Nullable<T> = T | null;
