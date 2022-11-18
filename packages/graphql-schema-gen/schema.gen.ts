
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum CourseProgressState {
    FAIL = "FAIL",
    IN_PROGRESS = "IN_PROGRESS",
    PASS = "PASS"
}

export enum CourseType {
    COURSE = "COURSE",
    QUIZ = "QUIZ"
}

export enum PageProgressState {
    FAIL = "FAIL",
    PASS = "PASS"
}

export class CoursePageContentInput {
    content: string;
}

export class CoursePageInput {
    content: string;
    description: string;
    title: string;
}

export class CoursePageProgressInput {
    course: string;
    page: string;
}

export class QuizPageInput {
    description: string;
    question: string;
    title: string;
}

export class QuizPageProgressInput {
    answers: string[];
    course: string;
    page: string;
    state: PageProgressState;
}

export class ResetPasswordInput {
    password: string;
    token: string;
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

export class UserInputUpdateNames {
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
}

export class UserInputUpdatePassword {
    newPassword: string;
    oldPassword: string;
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

export class Badge {
    _id: string;
    course?: Nullable<Course>;
    description: string;
    icon: string;
    link: string;
    title: string;
}

export class Course {
    _id: string;
    badge?: Nullable<Badge>;
    description: string;
    icon: string;
    pages: Page[];
    progress: CourseProgress;
    title: string;
    type: CourseType;
}

export class CourseProgress {
    fail: number;
    pass: number;
    state: CourseProgressState;
    submittedAt: DateTime;
}

export abstract class IMutation {
    abstract addPage(_id: string, pageId: string): Course | Promise<Course>;

    abstract claimBadge(badgeId: string): User | Promise<User>;

    abstract createCoursePage(data: CoursePageInput): Page | Promise<Page>;

    abstract createCoursePageProgress(data: CoursePageProgressInput): PageProgress | Promise<PageProgress>;

    abstract createQuizPage(data: QuizPageInput): Page | Promise<Page>;

    abstract createQuizPageProgress(data: QuizPageProgressInput): PageProgress | Promise<PageProgress>;

    abstract deletePagesProgresses(pages: string[]): boolean | Promise<boolean>;

    abstract forgotPassword(email: string): boolean | Promise<boolean>;

    abstract login(data: UserInputLogin): UserOutputLogin | Promise<UserOutputLogin>;

    abstract logout(): boolean | Promise<boolean>;

    abstract register(data: UserInputCreate): UserOutputLogin | Promise<UserOutputLogin>;

    abstract resetPassword(data: ResetPasswordInput): User | Promise<User>;

    abstract updateCoursePageContent(_id: string, data: CoursePageContentInput): Page | Promise<Page>;

    abstract updateUserNames(data: UserInputUpdateNames): User | Promise<User>;

    abstract updateUserPassword(data: UserInputUpdatePassword): User | Promise<User>;
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
    course: string;
    page: string;
    state: PageProgressState;
    type: CourseType;
    user: string;
}

export abstract class IQuery {
    abstract badges(): Badge[] | Promise<Badge[]>;

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
    badges?: Nullable<string[]>;
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

export type DateTime = any;
type Nullable<T> = T | null;
