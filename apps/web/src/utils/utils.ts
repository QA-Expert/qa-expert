import { Theme } from '@mui/material/styles';
import {
  CourseProgressState,
  GetUserQuery,
  PageProgressState,
} from '__generated__/graphql';

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

/**
 *
 * Got the code from @url https://github.com/mui/material-ui/blob/v5.15.3/docs/data/material/components/avatars/BackgroundLetterAvatars.tsx
 */
export const stringToColor = (string: string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

/**
 *
 * Got the code from @url  https://github.com/mui/material-ui/blob/v5.15.3/docs/data/material/components/avatars/BackgroundLetterAvatars.tsx
 *
 * @param name Could be email or combination of first and last names (e.g. "Andrei Surzhan" or "test@test.com")
 */
export const stringAvatar = (name: string) => {
  const text = name.includes(' ')
    ? `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
    : name[0];

  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: text.toUpperCase(),
  };
};

export const getUsername = (user: GetUserQuery['user'] | undefined) => {
  if (!user) {
    return '';
  }

  return user.firstName && user.lastName
    ? `${user.firstName} ${user.lastName}`
    : user.email;
};
