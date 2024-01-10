import { CourseProgressState } from '__generated__/graphql';
import { Course, States } from './progress';

export const getGroupedCoursesByState = (courses: Course[]) => {
  const groupedByState: {
    [K in States]: Course[];
  } = {
    [CourseProgressState.InProgress]: [],
    COMPLETED: [],
  };

  courses.forEach((course) => {
    if (course.progress.state !== CourseProgressState.InProgress) {
      groupedByState['COMPLETED'].push(course);
    }

    if (
      (course.progress.state === CourseProgressState.InProgress &&
        course.progress.fail > 0) ||
      course.progress.pass > 0
    ) {
      groupedByState[CourseProgressState.InProgress].push(course);
    }
  });

  return groupedByState;
};
