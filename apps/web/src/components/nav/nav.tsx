'use client';

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { GET_USER } from 'graphql/queries/queries';
import { ProfileMenu } from '@/components/profile-menu/profile-menu';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { useReactiveVar } from '@apollo/client';
import { isAuthenticated } from 'apollo/store';
import { Suspense, useState } from 'react';
import { Row } from '@/components/row/row';
import { BugReportModal } from '@/components/bug-report-modal/bug-report-modal';
import BugReportIcon from '@mui/icons-material/BugReport';
import IconButton from '@mui/material/IconButton';

export default function Nav() {
  const [bugReportModalOpen, setBugReportModalOpen] = useState(false);
  const isUserAuthenticated = useReactiveVar(isAuthenticated);
  const { data } = useSuspenseQuery(GET_USER, {
    skip: !isUserAuthenticated,
  });

  return (
    <>
      <AppBar component="nav" position="static" sx={{ zIndex: 'appBar' }}>
        <Toolbar
          component={Row}
          sx={{ gap: '2rem', padding: '0 2rem 0 2rem' }}
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

          <Row sx={{}}>
            {data?.user && isUserAuthenticated ? (
              <>
                <IconButton onClick={() => setBugReportModalOpen(true)}>
                  <BugReportIcon />
                </IconButton>
                <Suspense fallback={'...Login'}>
                  <ProfileMenu />
                </Suspense>
              </>
            ) : (
              <Link href="/login">
                <Button color="warning" variant="contained">
                  Login
                </Button>
              </Link>
            )}
          </Row>
        </Toolbar>
      </AppBar>

      <BugReportModal
        isOpen={bugReportModalOpen}
        onClose={() => setBugReportModalOpen(false)}
      />
    </>
  );
}
