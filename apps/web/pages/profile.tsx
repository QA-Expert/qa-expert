import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { Box } from '../src/components/box/box';
import Layout from '../src/components/layout/layout';
import { useUser } from '../src/context/auth';

function Account() {
  const user = useUser();
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
            alignItems: 'center',
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
          <Box>
            <Typography variant="h2" sx={{ fontSize: '2rem' }}>
              {user?.firstName
                ? `${user?.firstName} ${user?.lastName}`
                : user?.email}
            </Typography>
          </Box>
        </Paper>
        <Paper
          component={Box}
          sx={{
            alignItems: 'center',
            justifyContent: 'start',
            height: '100%',
            flex: 3.5,
            padding: '2rem',
          }}
        >
          <Typography variant="h2" sx={{ fontSize: '2rem' }}>
            Details
          </Typography>
        </Paper>
      </Box>
    </Layout>
  );
}

export default Account;
