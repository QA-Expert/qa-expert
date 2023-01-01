import { CourseProgressState } from './course-progress.schema';

export const getPercent = (total: number, part: number) =>
  total === 0 ? 0 : Math.round((part * 100) / total);

export const getState = (pass: number, fail: number) =>
  pass >= 100
    ? CourseProgressState.PASS
    : pass + fail >= 100
    ? CourseProgressState.FAIL
    : CourseProgressState.IN_PROGRESS;
