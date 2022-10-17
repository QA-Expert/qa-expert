import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { Box } from '../box/box';
import { ProfileMenu } from '../profile-menu/profile-menu';

export default function Nav() {
  return (
    <AppBar component="nav" position="static">
      <Container>
        <Toolbar disableGutters>
          <Link href={`/`}>
            <Typography
              href="/"
              component="a"
              variant="h1"
              noWrap
              sx={{
                fontSize: '2rem',
                textDecoration: 'none',
              }}
            >
              QA SCHOOL
            </Typography>
          </Link>
          <Box
            sx={{
              flexDirection: 'row',
              marginLeft: 'auto',
            }}
          >
            <Link href={`/login`}>
              <Button href="/login" sx={{ color: 'white', display: 'block' }}>
                Login
              </Button>
            </Link>

            <ProfileMenu />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
