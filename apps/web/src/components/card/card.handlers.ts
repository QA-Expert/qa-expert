import { formatDuration } from 'date-fns';

export const getRetakeQuizDuration = (duration: Duration) =>
  formatDuration(duration, {
    delimiter: ', ',
  });
