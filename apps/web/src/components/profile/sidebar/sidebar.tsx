'use client';

import { Row } from '@/components/row/row';
import { Section } from '@/components/section/section';
import { NavigationItem } from '@/components/sidebar/navigation-item/navigation-item';
import Avatar from '@mui/material/Avatar/Avatar';
import Button from '@mui/material/Button/Button';
import IconButton from '@mui/material/IconButton/IconButton';
import List from '@mui/material/List/List';
import Typography from '@mui/material/Typography/Typography';
import { useState } from 'react';
import { getUsername, stringAvatar } from 'utils/utils';
import { ChangeNamesModal } from '@/components/profile/change-names-modal/change-names-modal';
import { ChangePasswordModal } from '@/components/profile/change-password-modal/change-password-modal';
import EditIcon from '@mui/icons-material/Edit';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { useError } from 'utils/hooks';
import { GET_USER } from 'graphql/queries/queries';
import Link from 'next/link';

export type Section = 'badges' | 'billing' | 'activities' | 'progress';

const SECTIONS: Section[] = ['badges', 'activities', 'progress', 'billing'];

type Props = {
  onSectionSelect: (section: Section) => void;
  section: Section;
};

export function ProfileSidebar({
  onSectionSelect,
  section: currentSection,
}: Props) {
  const { data, error } = useSuspenseQuery(GET_USER);
  const user = data?.user;
  const username = getUsername(user);

  useError([error?.message]);

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
    <Section
      sx={{
        flex: 1,
        padding: '2rem',
        gap: '1rem',
      }}
    >
      <Avatar
        src=""
        alt="user profile image"
        {...stringAvatar(username)}
        sx={{ width: 160, height: 160, fontSize: '2rem' }}
      />

      <Row sx={{ justifyContent: 'center' }}>
        <Typography variant="h2" sx={{ fontSize: '2rem' }}>
          {username}
        </Typography>

        {user?.firstName || user?.lastName ? (
          <IconButton
            aria-label="change-user-names"
            onClick={handleOpenChangeUserNamesModal}
          >
            <EditIcon />
          </IconButton>
        ) : null}
      </Row>

      {!user?.firstName && !user?.lastName ? (
        <Button variant="contained" onClick={handleOpenChangeUserNamesModal}>
          Add First and Last Name
        </Button>
      ) : null}

      <Button onClick={handleOpenChangePasswordModal} variant="contained">
        Change Password
      </Button>

      <List
        component="nav"
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        {SECTIONS.map((section) => (
          <Link key={section} href={`#${section}`}>
            <NavigationItem
              sx={{
                padding: '0.5rem 1rem 0.5rem 1rem',
                textTransform: 'capitalize',
                color: 'secondary.main',
                borderRight:
                  currentSection === section ? 'solid 15px currentcolor' : '',
                backgroundColor:
                  currentSection === section ? 'transparent' : 'primary.dark',
              }}
              onClick={() => {
                onSectionSelect(section);
              }}
              selected={currentSection === section}
            >
              {section}
            </NavigationItem>
          </Link>
        ))}
      </List>

      <ChangeNamesModal
        open={changeUserNamesModalOpen}
        onClose={handleCloseChangeUserNameModal}
      />

      <ChangePasswordModal
        open={changePasswordModalOpen}
        onClose={handleCloseChangePasswordModal}
      />
    </Section>
  );
}
