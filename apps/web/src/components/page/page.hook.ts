import { useEffect, useState } from 'react';

/**
 *
 * @param maxValueInMillSeconds - max value in milliseconds when progress timer is supposed to stop
 * and that is equal to 100% progress
 * @returns - percentage of the progress for each second
 */
export const useProgressTimer = (maxValueInMillSeconds: number) => {
  const [value, setValue] = useState(0);
  const maxSeconds = Number(maxValueInMillSeconds) / 1000;

  useEffect(() => {
    if (value < maxSeconds) {
      const timer = setInterval(async () => {
        setValue(value + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [value, maxSeconds]);

  return (value * 100) / maxSeconds;
};
