import { gql } from '@apollo/client';
import { COURSE_HEADING_FRAGMENT, PAGE_FRAGMENT } from '../fragments/fragments';

export const GET_ALL_COURSES = gql`
  ${COURSE_HEADING_FRAGMENT}
  query GetAllCourses {
    courses {
      ...CourseHeadingFragment
      progress {
        pass
        fail
      }
    }
  }
`;

export const GET_COURSE = gql`
  ${COURSE_HEADING_FRAGMENT}
  ${PAGE_FRAGMENT}
  query GetCourse($_id: String!) {
    course(_id: $_id) {
      ...CourseHeadingFragment
      pages {
        ...PageFragment
      }
    }
  }
`;

export const GET_USER = gql`
  query GetUser {
    user {
      _id
      email
      firstName
      lastName
      roles
    }
  }
`;

export const GET_BADGES = gql`
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
`;
