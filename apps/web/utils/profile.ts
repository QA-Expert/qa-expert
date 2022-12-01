import { PaletteColor } from '@mui/material/';
import { ChartData, ChartOptions } from 'chart.js';
import { format } from 'date-fns';
import { capitalize, groupBy } from 'lodash';
import {
  CourseType,
  GetAllSubmittedProgressesQuery,
} from '../src/__generated__/graphql';

export interface GroupedProgresses {
  [courseId: string]: GetAllSubmittedProgressesQuery['submittedProgresses'];
}

export const getChartData = (
  progresses: GetAllSubmittedProgressesQuery['submittedProgresses'] | undefined,
  quizColor: PaletteColor,
  totalColor: PaletteColor,
): {
  data: ChartData<'line'>;
  options: ChartOptions<'line'>;
}[] => {
  const groupedProgress: GroupedProgresses = groupBy(
    progresses,
    (progress) => progress.course._id,
  );
  const courseIds = Object.keys(groupedProgress);

  return courseIds
    .filter(hasFailedPRogress(groupedProgress))
    .map(getChartDataFromProgress(groupedProgress, quizColor, totalColor));
};

const hasFailedPRogress =
  (groupedProgress: GroupedProgresses) => (courseId: string) => {
    const progresses = groupedProgress[courseId];

    return progresses.length || progresses[0].totalProgress < 100;
  };

const getChartDataFromProgress =
  (
    groupedProgress: GroupedProgresses,
    quizColor: PaletteColor,
    totalColor: PaletteColor,
  ) =>
  (courseId: string) => {
    const progresses = groupedProgress[courseId];
    const dataQuiz = progresses.map((progress) => progress.quizProgress);
    const dataTotal = progresses.map((progress) => progress.totalProgress);
    const labels = progresses.map((progress) =>
      format(new Date(progress.createdAt), 'MM/dd/yyyy'),
    );
    const options = getChartOptions(progresses);

    return {
      data: {
        labels,
        datasets: [
          {
            label: `${capitalize(CourseType.Quiz)} progress`,
            data: dataQuiz,
            borderColor: quizColor.dark,
            backgroundColor: quizColor.main,
          },
          {
            label: `Total progress`,
            data: dataTotal,
            borderColor: totalColor.dark,
            backgroundColor: totalColor.main,
          },
        ],
      },
      options,
    };
  };

const getChartOptions = (progresses: GroupedProgresses['courseId']) => ({
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: progresses[0].course.title,
    },
  },
  scales: {
    y: {
      suggestedMin: 0,
      suggestedMax: 100,
      display: true,
      title: {
        display: true,
        text: 'Progress',
      },
    },
    x: {
      display: true,
      title: {
        display: true,
        text: 'Date when finished',
      },
    },
  },
});
