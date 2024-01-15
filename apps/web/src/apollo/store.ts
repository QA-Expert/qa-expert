import { Data as QuizPageData } from '@/components/quiz-section/quiz-section';
import { makeVar } from '@apollo/client';
import { AlertColor } from '@mui/material/Alert';
import { AnswerValidationRestApiOutput } from '__generated__/graphql';

export interface Toast {
  message: string;
  color: AlertColor;
}

export const isAuthenticated = makeVar(false);
export const quizPageData = makeVar<QuizPageData | null>(null);
export const restApiQuestionResponse = makeVar<
  AnswerValidationRestApiOutput | null | undefined
>(null);
export const toastErrors = makeVar<Toast[]>([]);
