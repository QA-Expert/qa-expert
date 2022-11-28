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
  GET_SUBMITTED_PROGRESSES,
} from '../src/graphql/queries/queries';
import { useQuery } from '@apollo/client';
import { BadgeComponent } from '../src/components/badge/badge';
import Divider from '@mui/material/Divider';
import { Line } from 'react-chartjs-2';
import { ChartData, ChartOptions, Tooltip } from 'chart.js';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from 'chart.js';
import { GetSubmittedProgressesQuery } from '../src/__generated__/graphql';
import { groupBy } from 'lodash';
import { format } from 'date-fns';
import { useTheme } from '@mui/material/styles';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
);

interface GroupedProgresses {
  [courseId: string]: GetSubmittedProgressesQuery['submittedProgresses'];
}

const getChartData = (
  groupedProgress: GroupedProgresses,
  color: string,
): {
  data: ChartData<'line'>;
  options: ChartOptions<'line'>;
}[] => {
  const courseIds = Object.keys(groupedProgress);

  return courseIds.map((courseId) => {
    const progresses = groupedProgress[courseId];
    const data = progresses.map((progress) => progress.progress);
    const labels = progresses.map((progress) =>
      format(new Date(progress.createdAt), 'MM/dd/yyyy'),
    );

    return {
      data: {
        labels,
        datasets: [
          {
            data,
            borderColor: color,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: progresses[0].course.title,
          },
        },
        scales: {
          y: {
            suggestedMin: 0,
            suggestedMax: 100,
          },
        },
      },
    };
  });
};

function Account() {
  const [user] = useAtom(userAtom);
  const { data: badges } = useQuery(GET_BADGES);
  const { data: progresses } = useQuery(GET_SUBMITTED_PROGRESSES);
  const theme = useTheme();
  const groupedProgress: GroupedProgresses = groupBy(
    progresses?.submittedProgresses,
    (progress) => progress.course._id,
  );
  const chartsData = getChartData(groupedProgress, theme.palette.primary.main);

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
              Progress
            </Typography>

            {chartsData.map((data, i) => (
              <Line key={i} {...data} />
            ))}
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
