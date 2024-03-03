import styled from '@mui/material/styles/styled';
import { ReactNode } from 'react';

export function Form({
  children,
  noValidate = false,
  onSubmit,
}: {
  children: ReactNode;
  noValidate?: boolean;
  onSubmit?: () => void;
}) {
  return (
    <StyledForm noValidate={noValidate} onSubmit={onSubmit}>
      {children}
    </StyledForm>
  );
}

const StyledForm = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1rem',
  minWidth: '360px',
  maxWidth: '500px',
  [theme.breakpoints.down('md')]: {
    maxWidth: '360px',
  },
}));
