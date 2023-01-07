import { ThemeOptions } from '@mui/material/styles';

// Create a theme instance.
export const dark: ThemeOptions = {
  palette: {
    text: { primary: '#fff', secondary: '#C1BFD4' },
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
    action: {
      hover: '#232233',
      hoverOpacity: 0.3,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.primary.main,
          borderRadius: '0.75rem',
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
          borderRadius: '2rem',
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
