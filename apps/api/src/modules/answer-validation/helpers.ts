import _ from 'lodash';
import { AnswerRestApiData } from '../answers/answer-data-types';

export const getRestApiResponse = (
  actualRequest: AnswerRestApiData,
  expectedRequest: AnswerRestApiData,
) => {
  if (expectedRequest.host !== actualRequest.host) {
    return {
      status: 403,
      body: 'Forbidden - invalid host.',
    };
  }

  if (
    expectedRequest.headers.find((h) => h.name === 'authenticate')?.value !==
    actualRequest.headers.find((h) => h.name === 'authenticate')?.value
  ) {
    return {
      status: 401,
      body: 'Unauthorized - auth token is invalid',
    };
  }

  if (!_.isEqual(expectedRequest.params, actualRequest.params)) {
    return {
      status: 404,
      body: 'No Found - invalid url search parameters values or names',
    };
  }

  if (!_.isEqual(expectedRequest.headers, actualRequest.headers)) {
    return {
      status: 400,
      body: 'Bad Request - invalid headers values or names',
    };
  }

  if (!_.isEqual(expectedRequest.body, actualRequest.body)) {
    return {
      status: 400,
      body: 'Bad Request - invalid body',
    };
  }

  return {
    status: 200,
    body: 'OK',
  };
};
