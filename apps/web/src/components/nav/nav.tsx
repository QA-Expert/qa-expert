import { useQuery } from '@apollo/client';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { GET_USER } from '../../graphql/queries/queries';
import { Box } from '../box/box';
import { ProfileMenu } from '../profile-menu/profile-menu';

export default function Nav() {
  const { data } = useQuery(GET_USER, {
    fetchPolicy: 'cache-only',
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
          {data?.user ? (
            <ProfileMenu />
          ) : (
            <Link href="/login">
              <Button variant="contained" color="success">
                Login
              </Button>
            </Link>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
