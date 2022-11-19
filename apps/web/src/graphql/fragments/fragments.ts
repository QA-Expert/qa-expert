import { gql } from '../../__generated__/gql';

export const PAGE_FRAGMENT = gql(/* GraphQL */ `
  fragment PageFragment on Page {
    _id
    title
    type
    description
    content
    question {
      content
      answers {
        _id
        content
      }
      options {
        _id
        content
      }
    }
    progress {
      _id
      state
      answers
    }
  }
`);
