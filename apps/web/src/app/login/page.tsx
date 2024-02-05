'use client';

import { Box } from '@/components/box/box';
import { LoginForm } from '@/components/login-form/login-form';
import { ModalTitle } from '@/components/modal/title/title';
import Paper from '@mui/material/Paper/Paper';
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
      <ModalTitle>Login</ModalTitle>

      <LoginForm onSubmit={handleSubmit} />
    </Paper>
  );
}
