import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from '@mui/material';
import Link from 'next/link';
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
              marginLeft: 'auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
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
