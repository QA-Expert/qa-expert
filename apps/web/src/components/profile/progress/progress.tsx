'use client';

import { Box } from '@/components/box/box';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import {
  CourseProgressState,
  GetAllCoursesQuery,
  GetSubmittedUserProgressesUserQuery,
} from '__generated__/graphql';
import {
  GET_ALL_COURSES,
  GET_SUBMITTED_USER_PROGRESSES,
} from 'graphql/queries/queries';
import { useError } from 'utils/hooks';
import { CoursesList } from './courses-list';

export type Course = Pick<
  | GetAllCoursesQuery['courses'][number]
  | GetSubmittedUserProgressesUserQuery['submittedProgresses'][number]['course'],
  '_id' | 'title' | 'progress' | 'level'
>;

export type States = 'COMPLETED' | CourseProgressState.InProgress;

export function Progress() {
  const { data: coursesData, error: coursesError } =
    useSuspenseQuery(GET_ALL_COURSES);
  const { data: submittedProgresses, error: submittedProgressError } =
    useSuspenseQuery(GET_SUBMITTED_USER_PROGRESSES);

  useError([coursesError?.message, submittedProgressError?.message]);

  const completedCourses = submittedProgresses.submittedProgresses.map(
    (progress) => progress.course,
  );
  const inProgressCourses = coursesData.courses.filter(
    (course) =>
      course.progress.state === CourseProgressState.InProgress &&
      (course.progress.fail > 0 || course.progress.pass > 0),
  );

  return (
    <Box sx={{ width: '100%', gap: '2rem' }}>
      <CoursesList
        courses={inProgressCourses}
        title="currently in progress"
        state={CourseProgressState.InProgress}
      />
      <CoursesList
        courses={completedCourses}
        title="completed once"
        state={'COMPLETED'}
      />
    </Box>
  );
}
