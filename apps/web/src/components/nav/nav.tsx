'use client';

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { GET_USER } from 'graphql/queries/queries';
import { Box } from '@/components/box/box';
import { ProfileMenu } from '@/components/profile-menu/profile-menu';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { useReactiveVar } from '@apollo/client';
import { isAuthenticated } from 'apollo/store';

export default function Nav() {
  const isUserAuthenticated = useReactiveVar(isAuthenticated);
  const { data } = useSuspenseQuery(GET_USER, {
    skip: !isUserAuthenticated,
  });

  return (
    <AppBar component="nav" position="static" sx={{ zIndex: 'appBar' }}>
      <Toolbar
        component={Box}
        sx={{ flexDirection: 'row', gap: '2rem', padding: '0 2rem 0 2rem' }}
        disableGutters
      >
        <Link href={`/`}>
          <Typography
            variant="h1"
            noWrap
            sx={{
              fontSize: '2rem',
              textDecoration: 'none',
            }}
          >
            QA EXPERT
          </Typography>
        </Link>

        <Link href={`/courses`}>
          <Typography variant="body1" noWrap>
            Courses
          </Typography>
        </Link>

        <Box
          sx={{
            flexDirection: 'row',
            marginLeft: 'auto',
          }}
        >
          {data?.user && isUserAuthenticated ? (
            <ProfileMenu />
          ) : (
            <Link href="/login">
              <Button color="warning" variant="contained">
                Login
              </Button>
            </Link>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
