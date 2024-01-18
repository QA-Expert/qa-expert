'use client';

import { LoginForm } from '@/components/login-form/login-form';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from '@mui/material/Button';

export default function LoginModal() {
  const router = useRouter();
  const path = usePathname();
  const [open, setOpen] = useState(path === '/login');

  const handleClick = () => {
    setOpen(false);
    router.back();
  };

  return (
    <Dialog open={open} onClose={handleClick}>
      <DialogTitle sx={{ fontSize: '2rem', textAlign: 'center' }} variant="h1">
        Login
      </DialogTitle>
      <DialogContent>
        <LoginForm onSubmit={handleClick} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClick}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
