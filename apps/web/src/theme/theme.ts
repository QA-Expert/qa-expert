import { ThemeOptions } from '@mui/material/styles';

// Create a theme instance.
export const dark: ThemeOptions = {
  palette: {
    text: { primary: '#fff', secondary: '#fff' },
    primary: {
      main: '#2E2D3F',
      light: '#2E2D3F',
      dark: '#232233',
      contrastText: '#fff',
    },
    secondary: {
      main: '#7A75CD',
      light: '#8785A3',
      dark: '$7A75CD',
      contrastText: '#fff',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.primary.main,
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.primary.main,
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.text.primary,
        }),
      },
    },
    MuiSvgIcon: {
      defaultProps: {
        color: 'secondary',
      },
    },
  },
};

export const light: ThemeOptions = {
  palette: { mode: 'light' },
};
