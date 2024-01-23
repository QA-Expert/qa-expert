import { gql } from '__generated__/gql';

export const GET_ALL_COURSES = gql(/* GraphQL */ `
  query GetAllCourses {
    courses {
      _id
      title
      type
      level
      description
      likes
      isLiked
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
      likes
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
      likes
      isLiked
      progress {
        pagesLeftBeforeFinish
        pass
        fail
        state
        updatedAt
      }
      badge {
        _id
      }
      pages {
        _id
        title
        type
        description
        content
        question {
          content
          type
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
          data
        }
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

export const GET_USER = gql(/* GraphQL */ `
  query GetUser {
    user {
      _id
      email
      firstName
      lastName
      roles
    }
  }
`);

export const GET_CLAIMED_BADGES = gql(/* GraphQL */ `
  query GetClaimedBadges {
    claimedBadges {
      _id
      badge
      user
      createdAt
    }
  }
`);

export const GET_ALL_AND_CLAIMED_BADGES = gql(/* GraphQL */ `
  query GetAllAndClaimedBadges {
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
    claimedBadges {
      _id
      badge
      createdAt
    }
  }
`);

export const GET_SUBMITTED_USER_PROGRESSES = gql(/* GraphQL */ `
  query GetSubmittedUserProgressesUser {
    submittedProgresses {
      _id
      totalProgress
      quizProgress
      courseProgress
      createdAt
      course {
        _id
        title
        level
        progress {
          state
          pass
          fail
        }
      }
    }
  }
`);

export const GET_CREDIT_CARD = gql(/* GraphQL */ `
  query GetCreditCard {
    creditCard {
      _id
      cardToken
      lastFour
      expiryMonth
      expiryYear
      cardType
      user
      address {
        phoneNumber
        streetLine1
        streetLine2
        city
        country
        zip
      }
    }
  }
`);

export const GET_USER_ACTIVITIES = gql(/* GraphQL */ `
  query GetUserActivities {
    activities {
      _id
      title
      description
      value
    }
  }
`);

export const GET_BILLING_TRANSACTIONS = gql(/* GraphQL */ `
  query GetBillingTransactions {
    transactions {
      _id
      createdAt
    }
  }
`);
