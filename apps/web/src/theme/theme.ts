'use client';

import { ThemeOptions, createTheme } from '@mui/material/styles';
import { merge } from 'lodash';

const base: ThemeOptions = {
  components: {
    MuiLink: {
      defaultProps: {
        color: 'warning.main',
      },
    },
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
          textAlign: 'left',
          padding: '1rem',
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
    MuiPaper: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          backgroundColor: theme.palette.primary.main,
          borderRadius: ownerState.square ? 0 : '0.75rem',
        }),
      },
    },
    MuiButton: {
      defaultProps: {
        color: 'secondary',
      },
      styleOverrides: {
        root: ({ theme }) => ({
          fontWeight: 'bold',
          borderRadius: '2rem',
          color: theme.palette.text.primary,
        }),
      },
    },
    MuiSvgIcon: {
      defaultProps: {
        color: 'secondary',
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ':last-of-type': {
            borderBottomLeftRadius: ownerState.square ? 0 : '0.75rem',
            borderBottomRightRadius: ownerState.square ? 0 : '0.75rem',
          },
        }),
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: () => ({
          gap: '0.5rem',
        }),
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 0,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        label: {
          minWidth: '2rem',
          textAlign: 'center',
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: '0.75rem',
          backgroundColor: theme.palette.background.toString(),
          padding: '0.5rem',
        }),
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.secondary,
          borderRadius: '0.5rem',
          border: 'none',
          '&.Mui-selected': {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.primary.main,
          },
          '&.Mui-selected:hover': {
            backgroundColor: theme.palette.secondary.main,
          },
          '&:hover': {
            textDecoration: 'none',
            opacity: 0.3,
            backgroundColor: 'inherit',
          },
        }),
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: ({ theme }) => ({
          '&.Mui-disabled': {
            color: theme.palette.text.secondary,
          },
        }),
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
      dark: '#1E1D35',
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
      dark: '#38D3D317',
    },
    action: {
      hover: '#232233',
      hoverOpacity: 0.3,
    },
  },
});

export const light: ThemeOptions = merge(base, {
  palette: { mode: 'light' },
});

export default createTheme(dark);
