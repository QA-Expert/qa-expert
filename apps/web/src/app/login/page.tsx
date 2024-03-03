'use client';

import { Box } from '@/components/box/box';
import { LoginForm } from '@/components/login-form/login-form';
import { ModalTitle } from '@/components/modal/title/title';
import { useReactiveVar } from '@apollo/client';
import Paper from '@mui/material/Paper/Paper';
import { routePathObject } from 'apollo/store';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { matchesPathname } from 'utils/url';

export default function Login() {
  const router = useRouter();
  const routePathObj = useReactiveVar(routePathObject);
  const shouldPushToCoursesPage =
    !routePathObj.previous ||
    !routePathObj.current ||
    matchesPathname(routePathObj.previous, routePathObj.current);

  const handleSubmit = useCallback(() => {
    if (shouldPushToCoursesPage) {
      router.push('/courses');
    } else {
      router.back();
    }
  }, [router, shouldPushToCoursesPage]);

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
