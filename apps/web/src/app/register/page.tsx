'use client';

import { Box } from '@/components/box/box';
import { RegistrationForm } from '@/components/registration-form/registration-form';
import Paper from '@mui/material/Paper/Paper';
import Typography from '@mui/material/Typography/Typography';

function Register() {
  return (
    <Paper
      sx={{
        gap: '1rem',
        padding: '2rem',
      }}
      component={Box}
    >
      <Typography
        sx={{
          fontSize: '2rem',
          color: 'warning.main',
          textTransform: 'uppercase',
        }}
        variant="h1"
      >
        Register
      </Typography>
      <RegistrationForm />
    </Paper>
  );
}

export default Register;
