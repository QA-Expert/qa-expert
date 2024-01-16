import _ from 'lodash';
import { AnswerRestApiData } from '../answers/answer-data-types';
import { Status } from './answer-validation-rest-api.output';

export const getRestApiResponse = (
  actualRequest: AnswerRestApiData,
  expectedRequest: AnswerRestApiData,
) => {
  if (expectedRequest.host !== actualRequest.host) {
    return {
      status: Status.FORBIDDEN,
      body: 'Forbidden - invalid host.',
    };
  }

  if (
    expectedRequest.headers.find((h) => h.name === 'authenticate')?.value !==
    actualRequest.headers.find((h) => h.name === 'authenticate')?.value
  ) {
    return {
      status: Status.UNAUTHORIZED,
      body: 'Unauthorized - auth token is invalid',
    };
  }

  if (!_.isEqual(expectedRequest.params, actualRequest.params)) {
    return {
      status: Status.NOT_FOUND,
      body: 'No Found - invalid url search parameters values or names',
    };
  }

  if (!_.isEqual(expectedRequest.headers, actualRequest.headers)) {
    return {
      status: Status.BAD_REQUEST,
      body: 'Bad Request - invalid headers values or names',
    };
  }

  if (!_.isEqual(expectedRequest.body, actualRequest.body)) {
    return {
      status: Status.BAD_REQUEST,
      body: 'Bad Request - invalid body',
    };
  }

  if (!_.isEqual(expectedRequest.method, actualRequest.method)) {
    return {
      status: Status.METHOD_NOT_ALLOWED,
      body: 'Method Not Allowed - invalid method',
    };
  }

  return {
    status: Status.OK,
    body: 'OK',
  };
};
