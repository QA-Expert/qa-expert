import { Theme } from '@mui/material/styles';
import { CourseLevel } from '../../__generated__/graphql';

export const getBackgroundColorForLevelLabel = (
  level: CourseLevel,
  theme: Theme,
) => {
  switch (level) {
    case CourseLevel.Beginner:
      return theme.palette.success.main;

    case CourseLevel.Intermediate:
      return theme.palette.secondary.main;

    case CourseLevel.Advanced:
      return theme.palette.warning.main;

    case CourseLevel.Expert:
      return theme.palette.error.main;

    default:
      break;
  }
};
