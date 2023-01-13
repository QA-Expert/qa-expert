import { ThemeOptions } from '@mui/material/styles';
import { merge } from 'lodash';

const base: ThemeOptions = {
  components: {
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.primary.main,
          borderRadius: '0.75rem',
        }),
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.primary.light,
          width: '100%',
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
        root: () => ({
          fontWeight: 'bold',
          borderRadius: '2rem',
        }),
      },
    },
    MuiSvgIcon: {
      defaultProps: {
        color: 'secondary',
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: () => ({
          gap: '0.5rem',
        }),
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          ':last-child': {
            paddingBottom: 0,
          },
        },
      },
    },
  },
};

// Create a theme instance.
export const dark: ThemeOptions = merge(base, {
  palette: {
    background: '#232233',
    text: { primary: '#fff', secondary: '#C1BFD4' },
    primary: {
      main: '#2E2D3F',
      light: '#3D3C52',
      dark: '#232233',
      contrastText: '#fff',
    },
    secondary: {
      main: '#7A75CD',
      light: '#8785A3',
      dark: '#7A75CD',
      contrastText: '#fff',
    },
    warning: {
      main: '#FF9900',
    },
    error: {
      main: '#E6435E',
    },
    success: {
      main: '#38D3D3',
    },
    action: {
      hover: '#232233',
      hoverOpacity: 0.3,
    },
  },
});

export const light: ThemeOptions = {
  palette: { mode: 'light' },
};
