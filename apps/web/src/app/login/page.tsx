'use client';

import { Box } from '@/components/box/box';
import { GoogleLoginButton } from '@/components/login-form/google-login-button';
import { LoginForm } from '@/components/login-form/login-form';
import Paper from '@mui/material/Paper/Paper';
import Typography from '@mui/material/Typography/Typography';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();

  const handleSubmit = () => {
    router.back();
  };

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

      <LoginForm onSubmit={handleSubmit} />

      <GoogleLoginButton />
    </Paper>
  );
}
