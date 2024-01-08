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
