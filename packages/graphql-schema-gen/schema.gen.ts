
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

export class AnswerInput {
    answer: string;
    quizPageId: string;
    userId: string;
}

export class CourseProgressInput {
    courseId: string;
    coursePageId: string;
    userId: string;
}

export class QuizProgressInput {
    quizId: string;
    quizPageId: string;
    state: QuizPageProgressState;
    userId: string;
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

export interface BaseContnet extends Base {
    desciption: string;
    id: string;
    title: string;
}

export interface UserBaseModel {
    email: string;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
}

export class Answer implements Base {
    answer: string;
    id: string;
    quizPageId: string;
    userId: string;
}

export class Course implements Base, BaseContnet {
    coursePages: CoursePage[];
    desciption: string;
    icon: string;
    id: string;
    quizzes: Quiz[];
    title: string;
}

export class CoursePage implements Base, BaseContnet {
    content: string;
    desciption: string;
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
    abstract createAnswer(data: AnswerInput): Answer | Promise<Answer>;

    abstract createCoursProgress(data: CourseProgressInput): CourseProgress | Promise<CourseProgress>;

    abstract createQuizProgress(data: QuizProgressInput): QuizProgress | Promise<QuizProgress>;

    abstract login(data: UserInputLogin): UserOutputLogin | Promise<UserOutputLogin>;

    abstract register(data: UserInputCreate): UserOutputLogin | Promise<UserOutputLogin>;
}

export abstract class IQuery {
    abstract answer(quizPageId: string, userId: string): Answer | Promise<Answer>;

    abstract coursProgresses(courseId: string): CourseProgress[] | Promise<CourseProgress[]>;

    abstract course(id: string): Course | Promise<Course>;

    abstract courses(): Course[] | Promise<Course[]>;

    abstract quiz(id: string): Quiz | Promise<Quiz>;

    abstract quizProgresses(quizId: string): QuizProgress[] | Promise<QuizProgress[]>;

    abstract quizzes(): Quiz[] | Promise<Quiz[]>;

    abstract user(): User | Promise<User>;
}

export class Question implements Base {
    content: string;
    expectedResult: string;
    id: string;
}

export class Quiz implements Base, BaseContnet {
    courses: Course[];
    desciption: string;
    expectedResult: string;
    id: string;
    quizPages: QuizPage[];
    title: string;
    type: QuizType;
}

export class QuizPage implements Base, BaseContnet {
    desciption: string;
    expectedResult: string;
    id: string;
    questions: Question[];
    title: string;
}

export class QuizProgress implements Base {
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
