import { Theme } from '@mui/material/styles';
import { CourseProgressState, PageProgressState } from '__generated__/graphql';

export const convertNumberToString = (num: number, minimumIntegerDigits = 2) =>
  num.toLocaleString('en-US', {
    minimumIntegerDigits,
    useGrouping: false,
  });

export const getColorForState = (
  state: PageProgressState | CourseProgressState | undefined,
  theme: Theme,
) => {
  switch (state) {
    case PageProgressState.Pass || CourseProgressState.Pass:
      return theme.palette.success.main;

    case PageProgressState.Fail || CourseProgressState.Fail:
      return theme.palette.error.main;

    default:
      return theme.palette.secondary.main;
  }
};

export const getSelectedStyles = (theme: Theme) => ({
  outline: '0.125rem solid',
  outlineColor: `${theme.palette.secondary.main} !important`,
});
