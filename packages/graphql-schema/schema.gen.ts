
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

export class CoursProgressInput {
    coursId: string;
    coursPageId: string;
    userId: string;
}

export class QuizProgressInput {
    quizId: string;
    quizPageId: string;
    state: QuizPageProgressState;
    userId: string;
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

export class Answer implements Base {
    answer: string;
    id: string;
    quizPageId: string;
    userId: string;
}

export class Cours implements Base, BaseContnet {
    coursPages: CoursPage[];
    desciption: string;
    icon: string;
    id: string;
    quizzes: Quiz[];
    title: string;
}

export class CoursPage implements Base, BaseContnet {
    content: string;
    desciption: string;
    id: string;
    title: string;
}

export class CoursProgress implements Base {
    coursId: string;
    coursPageId: string;
    id: string;
    userId: string;
}

export abstract class IMutation {
    abstract createAnswer(data: AnswerInput): Answer | Promise<Answer>;

    abstract createCoursProgress(data: CoursProgressInput): CoursProgress | Promise<CoursProgress>;

    abstract createQuizProgress(data: QuizProgressInput): QuizProgress | Promise<QuizProgress>;
}

export abstract class IQuery {
    abstract answer(quizPageId: string, userId: string): Answer | Promise<Answer>;

    abstract cours(id: string): Cours | Promise<Cours>;

    abstract coursProgresses(coursId: string, userId: string): CoursProgress[] | Promise<CoursProgress[]>;

    abstract courses(): Cours[] | Promise<Cours[]>;

    abstract login(data: UserInputLogin): UserOutputLogin | Promise<UserOutputLogin>;

    abstract quiz(id: string): Quiz | Promise<Quiz>;

    abstract quizProgresses(quizId: string, userId: string): QuizProgress[] | Promise<QuizProgress[]>;

    abstract quizzes(): Quiz[] | Promise<Quiz[]>;

    abstract userByEmail(email: string): User | Promise<User>;

    abstract userById(id: string): User | Promise<User>;
}

export class Question implements Base {
    content: string;
    expectedResult: string;
    id: string;
}

export class Quiz implements Base, BaseContnet {
    courses: Cours[];
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
    firstName: string;
    id: string;
    lastName: string;
}

export class UserOutputLogin {
    access_token: string;
    email: string;
}

type Nullable<T> = T | null;
