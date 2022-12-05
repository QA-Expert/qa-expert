import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { Box } from '../src/components/box/box';
import Layout from '../src/components/layout/layout';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { useAtom } from 'jotai';
import { userAtom } from '../src/store';
import { ChangeNamesModal } from '../src/components/change-names-modal/change-names-modal';
import Button from '@mui/material/Button';
import { ChangePasswordModal } from '../src/components/change-password-modal/change-password-modal';
import {
  GET_BADGES,
  GET_ALL_SUBMITTED_PROGRESSES,
} from '../src/graphql/queries/queries';
import { useQuery } from '@apollo/client';
import { BadgeComponent } from '../src/components/badge/badge';
import Divider from '@mui/material/Divider';
import { Line } from 'react-chartjs-2';
import { Tooltip } from 'chart.js';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
} from 'chart.js';
import { useTheme } from '@mui/material/styles';
import { getChartData } from '../utils/profile';
import { useError } from '../utils/hooks';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

function Account() {
  const [user] = useAtom(userAtom);
  const { data: badges, error: errorBadges } = useQuery(GET_BADGES);
  const { data: progresses, error: errorProgresses } = useQuery(
    GET_ALL_SUBMITTED_PROGRESSES,
  );
  const theme = useTheme();
  const chartsData = getChartData(
    progresses?.submittedProgresses,
    theme.palette.warning,
    theme.palette.info,
  );

  useError([errorBadges?.message, errorProgresses?.message]);

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
          <Box
            sx={{
              gap: '1rem',
              width: '100%',
            }}
          >
            <Typography variant="h2" sx={{ fontSize: '2rem' }}>
              Progress
            </Typography>

            <Box
              sx={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                width: '100%',
                gap: '1rem',
              }}
            >
              {/* TODO: Implement better styles to comply with material design theme*/}
              {chartsData.map((data, i) => (
                <Box key={i} sx={{ flex: '1' }}>
                  <Line {...data} />
                </Box>
              ))}
            </Box>
          </Box>

          <Divider flexItem />

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
              {badges?.badges?.map((badge, i) => (
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
