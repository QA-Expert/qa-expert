import { Theme } from '@mui/material/styles';
import { Props } from '@/components/marketing/section';

export const getBackgroundStyles = (
  background: Props['background'],
  theme: Theme,
) => {
  if (background === 'gradient') {
    return {
      background: `radial-gradient(circle, ${theme.palette.secondary.main} -70%, ${theme.palette.primary.light} 20%, ${theme.palette.primary.main} 50%, ${theme.palette.primary.dark} 100%)`,
    };
  }

  if (background === 'waives') {
    return {
      backgroundImage: "url('/images/waives.svg')",
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
    };
  }

  if (background === 'light') {
    return {
      background: theme.palette.primary.main,
    };
  }
};

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
 */
export const stringAvatar = (name: string) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
};
