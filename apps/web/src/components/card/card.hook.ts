import { addDays, intervalToDuration } from 'date-fns';
import { useEffect, useState } from 'react';
import { getRetakeQuizDuration } from './card.handlers';

export const useDurationToRetakeQuiz = (submittedAt: string) => {
  const lastSubmittedDate = new Date(submittedAt);
  const canRetakeDate = addDays(
    lastSubmittedDate,
    Number(process.env.NEXT_PUBLIC_COURSE_COOLDOWN),
  );
  const nowDate = new Date();
  const duration = intervalToDuration({
    start: nowDate,
    end: canRetakeDate,
  });
  const [timeLeftToRetake, setTimeLeftToRetake] = useState<string>(
    getRetakeQuizDuration(duration),
  );
  const canRetakeQuiz = nowDate >= canRetakeDate;

  useEffect(() => {
    const intervalId = setInterval(() => {
      const duration = intervalToDuration({
        start: new Date(),
        end: canRetakeDate,
      });
      setTimeLeftToRetake(getRetakeQuizDuration(duration));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [canRetakeDate]);

  return {
    canRetakeQuiz,
    timeLeftToRetake,
  };
};
