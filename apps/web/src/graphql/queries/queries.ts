import { gql } from '../../__generated__/gql';

export const GET_ALL_COURSES = gql(/* GraphQL */ `
  query GetAllCourses {
    courses {
      _id
      title
      type
      description
      pages {
        _id
        type
      }
      progress {
        pass
        fail
        state
        submittedAt
      }
      badge {
        _id
      }
    }
  }
`);

export const GET_COURSE = gql(/* GraphQL */ `
  query GetCourse($_id: String!) {
    course(_id: $_id) {
      _id
      title
      type
      description
      pages {
        ...PageFragment
      }
    }
  }
`);

export const GET_USER = gql(/* GraphQL */ `
  query GetUser {
    user {
      _id
      email
      firstName
      lastName
      roles
      badges
    }
  }
`);

export const GET_BADGES = gql(/* GraphQL */ `
  query GetBadges {
    badges {
      _id
      title
      description
      icon
      link
      course {
        _id
        title
      }
    }
  }
`);

export const GET_SUBMITTED_PROGRESSES = gql(/* GraphQL */ `
  query GetSubmittedProgresses {
    submittedProgresses {
      _id
      progress
      createdAt
      course {
        _id
        title
      }
    }
  }
`);
