'use client';

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { GET_USER } from 'graphql/queries/queries';
import { ProfileMenu } from '@/components/nav/profile-menu/profile-menu';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { useReactiveVar } from '@apollo/client';
import { isAuthenticated } from 'apollo/store';
import { Suspense, useState } from 'react';
import { Row } from '@/components/row/row';
import { BugReportModal } from '@/components/bug-report-modal/bug-report-modal';
import BugReportIcon from '@mui/icons-material/BugReport';
import IconButton from '@mui/material/IconButton';
import { ContactUsModal } from '@/components/contact-us-modal/contact-us-modal';
import ChatIcon from '@mui/icons-material/Chat';
import Image from 'next/image';
import { Box } from '@/components/box/box';
import { PreReleaseOverlay } from '../pre-release-overlay/pre-release-overlay';

export default function Nav() {
  const [bugReportModalOpen, setBugReportModalOpen] = useState(false);
  const [contactUsModalOpen, setContactUsModalOpen] = useState(false);

  const isUserAuthenticated = useReactiveVar(isAuthenticated);
  const { data } = useSuspenseQuery(GET_USER, {
    skip: !isUserAuthenticated,
  });

  return (
    <>
      <AppBar component="nav" position="static" sx={{ zIndex: 'appBar' }}>
        <Toolbar
          component={Row}
          sx={{
            gap: '2rem',
            padding: '0 2rem 0 2rem',
          }}
          disableGutters
        >
          <Link href={`/`}>
            <Box>
              <Image
                priority
                src="/images/logo.svg"
                alt="QA Expert Logo"
                width={64}
                height={64}
              />
            </Box>
          </Link>

          <PreReleaseOverlay>
            <Link href={`/courses`}>
              <Typography variant="body1" noWrap sx={{ color: 'warning.main' }}>
                Courses
              </Typography>
            </Link>
          </PreReleaseOverlay>

          <Row sx={{ marginLeft: 'auto', width: 'auto' }}>
            <PreReleaseOverlay>
              <IconButton onClick={() => setContactUsModalOpen(true)}>
                <ChatIcon />
              </IconButton>
            </PreReleaseOverlay>

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
              <PreReleaseOverlay>
                <Link href="/login">
                  <Button color="warning" variant="contained">
                    Login
                  </Button>
                </Link>
              </PreReleaseOverlay>
            )}
          </Row>
        </Toolbar>
      </AppBar>

      <BugReportModal
        isOpen={bugReportModalOpen}
        onClose={() => setBugReportModalOpen(false)}
      />

      <ContactUsModal
        isOpen={contactUsModalOpen}
        onClose={() => setContactUsModalOpen(false)}
      />
    </>
  );
}
