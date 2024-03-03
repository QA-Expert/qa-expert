import { Data as QuizPageData } from '@/components/quiz-section/quiz-section';
import { makeVar } from '@apollo/client';
import { AlertColor } from '@mui/material/Alert';
import { AnswerValidationRestApiOutput } from '__generated__/graphql';

export interface Toast {
  message: string;
  color: AlertColor;
}

export const isAuthenticated = makeVar(false);

/**
 * @description This var is used to share quiz data object in Test App section
 */
export const quizPageData = makeVar<QuizPageData | undefined>(undefined);

/**
 * @description This var is used to share response object in Test App section
 */
export const restApiQuestionResponse = makeVar<
  AnswerValidationRestApiOutput | undefined
>(undefined);

export const toastErrors = makeVar<Toast[]>([]);

/**
 * @description This var is used to store course id to be able to use it to highlight course in gallery
 */
export const selectedCourseId = makeVar<string | undefined>(undefined);

/**
 * @description This var is used to store previous route path to be able to see if we need to route.back() or route.push(...).
 */
export const routePathObject = makeVar<{
  previous: string | undefined;
  current: string | undefined;
}>({
  previous: undefined,
  current: undefined,
});
