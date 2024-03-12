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

export const GET_ALL_COURSES_PUBLIC_META_DATA = gql(/* GraphQL */ `
  query GetAllCoursesPublicMetaData {
    coursesPublic {
      _id
      updatedAt
      title
      type
      level
      description
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

export const GET_COURSE_PUBLIC_META_DATA = gql(/* GraphQL */ `
  query GetCoursePublicMetaData($_id: String!) {
    coursePublic(_id: $_id) {
      _id
      title
      type
      level
      description
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

export const GET_CLAIMED_BADGE = gql(/* GraphQL */ `
  query GetClaimedBadge($_id: String!) {
    claimedBadge(_id: $_id) {
      _id
      badge {
        _id
        title
        description
        icon
        course {
          _id
          title
        }
      }
      user {
        _id
        firstName
        lastName
      }
      createdAt
    }
  }
`);

export const GET_CLAIMED_BADGES = gql(/* GraphQL */ `
  query GetClaimedBadges {
    claimedBadges {
      _id
      badge {
        _id
      }
      user {
        _id
      }
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
      course {
        _id
        title
      }
    }
    claimedBadges {
      _id
      badge {
        _id
      }
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

export const GET_SUBSCRIPTION = gql(/* GraphQL */ `
  query GetSubscription {
    subscription {
      _id
      externalId
      status
      currentPeriodStart
      currentPeriodEnd
      cancelationReason
    }
  }
`);

export const GET_PRICES = gql(/* GraphQL */ `
  query GetPrices {
    prices {
      id
      currency
      amount
    }
  }
`);

export const GET_PAYMENT_METHOD = gql(/* GraphQL */ `
  query GetPaymentMethod {
    paymentMethod {
      cardLast4
      cardBrand
      type
      fullName
      phone
      line1
      line2
      city
      state
      country
      postalCode
    }
  }
`);
