'use client';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { Box } from '../../src/components/box/box';
import Layout from '../../src/components/layout/layout';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { ChangeNamesModal } from '../../src/components/change-names-modal/change-names-modal';
import Button from '@mui/material/Button';
import { ChangePasswordModal } from '../../src/components/change-password-modal/change-password-modal';
import {
  GET_BADGES_SUBMITTED_PROGRESSES_USER,
  GET_USER,
} from '../../src/graphql/queries/queries';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { BadgeComponent } from '../../src/components/badge/badge';
import { useError } from '../../utils/hooks';
import { Row } from '../../src/components/row/row';

function Account() {
  const { data: userData, error: userFetchError } = useSuspenseQuery(GET_USER);
  const { data: badgesData, error: badgesFetchError } = useSuspenseQuery(
    GET_BADGES_SUBMITTED_PROGRESSES_USER,
  );
  const user = userData?.user;
  const badges = badgesData?.badges;

  useError([userFetchError?.message, badgesFetchError?.message]);

  const [changeUserNamesModalOpen, setChangeUserNamesModalOpen] =
    useState(false);
  const [changePasswordModalOpen, setChangePasswordsModalOpen] =
    useState(false);

  const handleOpenChangeUserNamesModal = () => {
    setChangeUserNamesModalOpen(true);
  };
  const handleCloseChangeUserNameModal = () => {
    setChangeUserNamesModalOpen(false);
  };

  const handleOpenChangePasswordModal = () => {
    setChangePasswordsModalOpen(true);
  };
  const handleCloseChangePasswordModal = () => {
    setChangePasswordsModalOpen(false);
  };

  return (
    <Layout>
      <Box
        sx={{
          flexDirection: 'row',
          width: '100%',
          height: '100%',
          gap: '2rem',
          padding: '2rem',
          flexWrap: 'wrap',
        }}
      >
        <Paper
          component={Box}
          sx={{
            justifyContent: 'start',
            flex: 1,
            height: '100%',
            padding: '2rem',
            gap: '1rem',
          }}
        >
          <Image
            width="200"
            height="200"
            src="/images/default-user-profile-image.svg"
            alt="user profile image"
          />

          <Row sx={{ justifyContent: 'center' }}>
            <Typography variant="h2" sx={{ fontSize: '2rem' }}>
              {user?.firstName
                ? `${user?.firstName} ${user?.lastName}`
                : user?.email}
            </Typography>
            {(user?.firstName || user?.lastName) && (
              <IconButton
                aria-label="change-user-names"
                onClick={handleOpenChangeUserNamesModal}
              >
                <EditIcon color="primary" />
              </IconButton>
            )}
          </Row>

          <Button onClick={handleOpenChangePasswordModal} variant="contained">
            Change Password
          </Button>
        </Paper>

        <Paper
          component={Box}
          sx={{
            justifyContent: 'start',
            height: '100%',
            flex: 3.5,
            padding: '2rem',
            gap: '1rem',
          }}
        >
          <Box sx={{ gap: '1rem' }}>
            <Typography variant="h2" sx={{ fontSize: '2rem' }}>
              Badges
            </Typography>
            <Box
              sx={{
                flexDirection: 'row',
                justifyContent: 'center',
                gap: '1rem',
                flexWrap: 'wrap',
              }}
            >
              {badges?.map((badge, i) => (
                <BadgeComponent
                  key={i}
                  {...badge}
                  isEarned={Boolean(user?.badges?.includes(badge._id))}
                />
              ))}
            </Box>
          </Box>
        </Paper>
      </Box>

      <ChangeNamesModal
        open={changeUserNamesModalOpen}
        onClose={handleCloseChangeUserNameModal}
      />

      <ChangePasswordModal
        open={changePasswordModalOpen}
        onClose={handleCloseChangePasswordModal}
      />
    </Layout>
  );
}

export default Account;
