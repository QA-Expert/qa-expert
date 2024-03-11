'use client';

import { Duration, addDays, intervalToDuration } from 'date-fns';
import { useEffect, useState } from 'react';

export const useDurationToRetakeQuiz = (submittedDate: string) => {
  const [durationLeft, setDurationLeft] = useState<Duration>({});
  const [canRetakeQuiz, setCanRetakeQuiz] = useState(false);

  const lastSubmittedDate = new Date(submittedDate);
  const canRetakeDate = addDays(
    lastSubmittedDate,
    Number(process.env.NEXT_PUBLIC_COURSE_COOLDOWN),
  );
  useEffect(() => {
    const now = new Date();

    const intervalId = setInterval(() => {
      const duration = intervalToDuration({
        start: now,
        end: canRetakeDate,
      });
      setDurationLeft(duration);

      const canRetakeQuiz = now >= canRetakeDate;

      setCanRetakeQuiz(canRetakeQuiz);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [canRetakeDate, submittedDate]);

  return {
    duration: durationLeft,
    canRetakeQuiz,
  };
};
