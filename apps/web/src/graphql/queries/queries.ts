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
        updatedAt
      }
      badge {
        _id
      }
    }
  }
`);

export const GET_ALL_COURSES_PUBLIC = gql(/* GraphQL */ `
  query GetAllCoursesPublic {
    coursesPublic {
      _id
      title
      type
      description
      pages {
        _id
        type
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
      progress {
        pagesLeftBeforeFinish
      }
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

export const GET_BADGES_SUBMITTED_PROGRESSES_USER = gql(/* GraphQL */ `
  query GetBadgesSubmittedProgressesUser {
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
    submittedProgresses {
      _id
      totalProgress
      quizProgress
      courseProgress
      createdAt
      course {
        _id
        title
      }
    }
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
