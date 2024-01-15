import { RestApiResponseData } from '@/components/quiz-section/quistion/rest-api/rest-api';
import { Data as QuizPageData } from '@/components/quiz-section/quiz-section';
import { makeVar } from '@apollo/client';
import { AlertColor } from '@mui/material/Alert';

export interface Toast {
  message: string;
  color: AlertColor;
}

export const isAuthenticated = makeVar(false);
export const quizPageData = makeVar<QuizPageData>(undefined);
export const restApiQuestionResponse = makeVar<RestApiResponseData>(undefined);
export const toastErrors = makeVar<Toast[]>([]);
