import {
  CourseProgressState,
  GetSubmittedUserProgressesUserQuery,
} from '__generated__/graphql';
import { Course, States } from './progress';

export const getGroupedCoursesByState = (
  progresses: GetSubmittedUserProgressesUserQuery['submittedProgresses'],
) => {
  const groupedByState: {
    [K in States]: Course[];
  } = {
    [CourseProgressState.InProgress]: [],
    COMPLETED: [],
  };

  progresses.forEach((progress) => {
    if (progress.course.progress.state !== CourseProgressState.InProgress) {
      groupedByState['COMPLETED'].push(progress.course);
    } else {
      groupedByState[CourseProgressState.InProgress].push(progress.course);
    }
  });

  return groupedByState;
};
