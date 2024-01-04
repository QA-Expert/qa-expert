'use client';

import { Box } from '@/components/box/box';
import { LoginForm } from '@/components/login-form/login-form';
import Paper from '@mui/material/Paper/Paper';
import Typography from '@mui/material/Typography/Typography';

export default function Login() {
  return (
    <Paper
      sx={{
        gap: '1rem',
        padding: '2rem',
      }}
      component={Box}
    >
      <Typography sx={{ fontSize: '2rem' }} variant="h1">
        Login
      </Typography>

      <LoginForm />
    </Paper>
  );
}
