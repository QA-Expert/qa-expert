import { CourseProgressState } from './course-progress.schema';

export const getPercent = (total: number, part: number) =>
  total === 0 ? 0 : Number(((part * 100) / total).toFixed());

export const getState = (pass: number, fail: number) =>
  pass >= 100
    ? CourseProgressState.PASS
    : pass + fail >= 100
    ? CourseProgressState.FAIL
    : CourseProgressState.IN_PROGRESS;
