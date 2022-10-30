
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum QuizPageProgressState {
    FAIL = "FAIL",
    PASS = "PASS"
}

export enum QuizType {
    PRACTICE = "PRACTICE",
    QUESTIONER = "QUESTIONER"
}

export class CoursePageContentInput {
    content: string;
}

export class CoursePageInput {
    content: string;
    description: string;
    title: string;
}

export class CourseProgressInput {
    course: string;
    coursePage: string;
}

export class QuizProgressInput {
    answers?: Nullable<string[]>;
    quiz: string;
    quizPage: string;
    state: QuizPageProgressState;
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
    coursePages: CoursePage[];
    description: string;
    icon: string;
    progress: ProgressPercentage;
    quizzes: Quiz[];
    title: string;
}

export class CoursePage {
    _id: string;
    content: string;
    description: string;
    progress?: Nullable<CourseProgress>;
    title: string;
}

export class CourseProgress {
    _id: string;
    course: string;
    coursePage: string;
    user: string;
}

export abstract class IMutation {
    abstract addCoursePage(_id: string, pageId: string): Course | Promise<Course>;

    abstract createCoursePage(data: CoursePageInput): CoursePage | Promise<CoursePage>;

    abstract createCourseProgress(data: CourseProgressInput): CourseProgress | Promise<CourseProgress>;

    abstract createQuizProgress(data: QuizProgressInput): QuizProgress | Promise<QuizProgress>;

    abstract login(data: UserInputLogin): UserOutputLogin | Promise<UserOutputLogin>;

    abstract logout(): boolean | Promise<boolean>;

    abstract register(data: UserInputCreate): UserOutputLogin | Promise<UserOutputLogin>;

    abstract updateCoursePageContent(_id: string, data: CoursePageContentInput): CoursePage | Promise<CoursePage>;
}

export class ProgressPercentage {
    fail: number;
    pass: number;
}

export abstract class IQuery {
    abstract course(_id: string): Course | Promise<Course>;

    abstract courseProgresses(courseId: string): CourseProgress[] | Promise<CourseProgress[]>;

    abstract courses(): Course[] | Promise<Course[]>;

    abstract quiz(_id: string): Quiz | Promise<Quiz>;

    abstract quizzes(): Quiz[] | Promise<Quiz[]>;

    abstract user(): User | Promise<User>;
}

export class Question {
    _id: string;
    answers: Answer[];
    content: string;
    options: Answer[];
}

export class Quiz {
    _id: string;
    courses: Course[];
    description: string;
    expectedResult: string;
    icon: string;
    progress: ProgressPercentage;
    quizPages: QuizPage[];
    title: string;
    type: QuizType;
}

export class QuizPage {
    _id: string;
    description: string;
    progress?: Nullable<QuizProgress>;
    question: Question;
    title: string;
}

export class QuizProgress {
    _id: string;
    answers: string[];
    quiz: string;
    quizPage: string;
    state: QuizPageProgressState;
    user: string;
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
