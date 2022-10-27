import {
  Course,
  CoursePage,
  Quiz,
  QuizPage,
} from 'graphql-schema-gen/schema.gen';
import { atom } from 'jotai';

export const quiz = atom<Quiz | null>(null);
export const quizPage = atom<QuizPage | null>(null);
export const course = atom<Course | null>(null);
export const coursePage = atom<CoursePage | null>(null);
