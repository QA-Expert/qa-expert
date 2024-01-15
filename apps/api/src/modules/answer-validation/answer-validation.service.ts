import { Injectable } from '@nestjs/common';
import { AnswerService } from '../answers/answer.service';
import {
  AnswerValidationRestApiOutput,
  Status,
} from './answer-validation-rest-api.output';
import { AnswerRestApiData } from '../answers/answer-data-types';
import { getRestApiResponse } from './helpers';
import { QuizPageProgressInput } from '../page-progresses/create-quiz-page-progress.input';
import { QuestionType } from '../questions/question.schema';
import _ from 'lodash';

@Injectable()
export class AnswerValidationService {
  constructor(private readonly serviceAnswer: AnswerService) {}

  async getRestApiResponse({
    data,
    expectedAnswerId,
  }: {
    data: string | undefined;
    expectedAnswerId: string | undefined;
  }): Promise<AnswerValidationRestApiOutput> {
    if (!expectedAnswerId) {
      throw new Error('Expected answer id is missing');
    }

    if (!data) {
      throw new Error('Data to compare is missing');
    }

    const answerDb = await this.serviceAnswer.findById(expectedAnswerId);

    if (!answerDb || !answerDb.data) {
      throw new Error(
        'Cannot find expected answer from DB or it does not have data field populated',
      );
    }

    try {
      const expectedData: AnswerRestApiData = JSON.parse(answerDb.data);
      const actualData: AnswerRestApiData = JSON.parse(data);

      return getRestApiResponse(expectedData, actualData);
    } catch (error) {
      throw new Error('Invalid data format, should be stringified JSON');
    }
  }

  async isRestApiRequestValid({
    data,
    expectedAnswerId,
  }: {
    data: string | undefined;
    expectedAnswerId: string | undefined;
  }) {
    const response = await this.getRestApiResponse({ data, expectedAnswerId });

    return response.status === Status.OK ? true : false;
  }

  async isAnswerValid(quizPageInput: QuizPageProgressInput) {
    const { actualAnswers, expectedAnswers, stringifiedData } = quizPageInput;

    if (quizPageInput.questionType === QuestionType.REST_API) {
      return await this.isRestApiRequestValid({
        data: stringifiedData,
        expectedAnswerId: expectedAnswers?.find((id) => id),
      });
    }

    if (
      quizPageInput.questionType === QuestionType.MULTIPLE_CHOICE ||
      quizPageInput.questionType === QuestionType.SINGLE_CHOICE
    ) {
      return Boolean(_.difference(actualAnswers!, expectedAnswers!).length);
    }
  }
}
