import { gql } from '../../__generated__/gql';

export const GET_ALL_COURSES = gql(/* GraphQL */ `
  query GetAllCourses {
    courses {
      _id
      title
      type
      level
      description
      pages {
        _id
        type
      }
      recommendedCourses {
        _id
        title
        level
        progress {
          state
        }
      }
      tags
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
      level
      description
      pages {
        _id
        type
      }
      tags
      recommendedCourses {
        _id
        title
        level
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
      level
      description
      progress {
        pagesLeftBeforeFinish
        pass
        fail
        state
        updatedAt
      }
      pages {
        ...PageFragment
      }
      recommendedCourses {
        _id
        title
        level
        progress {
          state
        }
      }
    }
  }
`);

export const GET_COURSE_PROGRESS_AND_BADGE = gql(/* GraphQL */ `
  query GetCourseProgressAndBadge($_id: String!) {
    course(_id: $_id) {
      _id
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
