import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { Box } from '../src/components/box/box';
import Layout from '../src/components/layout/layout';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { ChangeNamesModal } from '../src/components/change-names-modal/change-names-modal';
import Button from '@mui/material/Button';
import { ChangePasswordModal } from '../src/components/change-password-modal/change-password-modal';
import {
  GET_BADGES_SUBMITTED_PROGRESSES_USER,
  GET_USER,
} from '../src/graphql/queries/queries';
import { ApolloError, useQuery } from '@apollo/client';
import { BadgeComponent } from '../src/components/badge/badge';
import { useError } from '../utils/hooks';
import { APOLLO_STATE_PROP_NAME, initializeApollo } from '../apollo/client';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { GetBadgesSubmittedProgressesUserQuery } from '../src/__generated__/graphql';

function Account(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const { data, error } = props;
  // NOTE: we use query to refetch user from cache in case if user got changed dynamically
  // But we don't refetch user from network first time we visit page as it is fetched already and put in cache
  const { data: userData } = useQuery(GET_USER);
  const user = userData?.user;
  const badges = data?.badges;

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

          <Box sx={{ flexDirection: 'row', gap: '0.5rem' }}>
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
          </Box>

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

export const getServerSideProps: GetServerSideProps<{
  data?: GetBadgesSubmittedProgressesUserQuery;
  error?: ApolloError;
}> = async (context) => {
  const client = initializeApollo(null, context);
  const { data, error } = await await client.query({
    query: GET_BADGES_SUBMITTED_PROGRESSES_USER,
  });

  if (error) {
    return { props: { error } };
  } else {
    return {
      props: { data, [APOLLO_STATE_PROP_NAME]: client.cache.extract() },
    };
  }
};

export default Account;
