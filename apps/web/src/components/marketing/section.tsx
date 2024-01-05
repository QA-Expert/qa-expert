'use client';

import { ReactNode } from 'react';
import { Box } from '../box/box';
import Typography from '@mui/material/Typography/Typography';
import { Theme, useTheme } from '@mui/material/styles';

export type Props = {
  background?: 'waives' | 'gradient' | 'light';
  title: string;
  description: string;
  children: ReactNode;
};

const getBackgroundStyles = (background: Props['background'], theme: Theme) => {
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

export function Section({ background, title, description, children }: Props) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '500px',
        width: '100%',
        ...getBackgroundStyles(background, theme),
        padding: '5rem',
        [theme.breakpoints.down('md')]: {
          padding: '1rem',
          gap: '0.75rem',
        },
        gap: '2rem',
      }}
    >
      <Typography
        color="secondary.main"
        sx={{
          fontSize: '3.125rem',
          fontWeight: '700',
          lineHeight: '70px',
          textTransform: 'uppercase',
          textAlign: 'center',
          [theme.breakpoints.down('md')]: {
            fontSize: '2rem',
            fontWeight: '500',
            lineHeight: '35px',
          },
        }}
        variant="h2"
      >
        {title}
      </Typography>
      <Typography
        color="text.secondary"
        sx={{
          fontSize: '1.25rem',
          fontWeight: '700',
          lineHeight: '30px',
          textTransform: 'uppercase',
          textAlign: 'center',
          [theme.breakpoints.down('md')]: {
            fontSize: '1rem',
            fontWeight: '500',
            lineHeight: '20px',
          },
        }}
        variant="body1"
      >
        {description}
      </Typography>
      {children}
    </Box>
  );
}
