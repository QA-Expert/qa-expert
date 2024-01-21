'use client';

import { ReactNode } from 'react';
import { Box } from '@/components/box/box';
import Typography from '@mui/material/Typography/Typography';
import { useTheme } from '@mui/material/styles';
import { getBackgroundStyles } from '@/components/marketing/handlers';

export type Props = {
  background?: 'waives' | 'gradient' | 'light';
  title?: string;
  description?: string;
  children: ReactNode;
  isActive: boolean;
};

export function Section({
  background,
  title,
  description,
  children,
  isActive,
}: Props) {
  const theme = useTheme();

  if (!isActive) {
    return null;
  }

  return (
    <Box
      sx={{
        minHeight: '720px',
        width: '100%',
        ...getBackgroundStyles(background, theme),
        padding: '5rem',
        [theme.breakpoints.down('md')]: {
          padding: '1rem',
          gap: '0.75rem',
          minHeight: '610px',
        },
        gap: '2rem',
        scrollSnapAlign: 'start',
      }}
    >
      {title ? (
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
      ) : null}

      {description ? (
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
      ) : null}
      {children}
    </Box>
  );
}
