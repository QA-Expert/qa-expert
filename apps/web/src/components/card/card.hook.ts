import { addDays, intervalToDuration } from 'date-fns';
import { useEffect, useState } from 'react';

export const useDurationToRetakeQuiz = (createdAt: string) => {
  const lastSubmittedDate = new Date(createdAt);
  const canRetakeDate = addDays(
    lastSubmittedDate,
    Number(process.env.NEXT_PUBLIC_COURSE_COOLDOWN),
  );
  const nowDate = new Date();
  const duration = intervalToDuration({
    start: nowDate,
    end: canRetakeDate,
  });

  const [durationLeft, setDurationLeft] = useState<Duration>(duration);
  const canRetakeQuiz = nowDate >= canRetakeDate;

  useEffect(() => {
    const intervalId = setInterval(() => {
      const duration = intervalToDuration({
        start: new Date(),
        end: canRetakeDate,
      });
      setDurationLeft(duration);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [canRetakeDate]);

  return {
    duration: durationLeft,
    canRetakeQuiz,
  };
};
