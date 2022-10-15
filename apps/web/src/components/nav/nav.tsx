import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from '@mui/material';
import { styled } from '@stitches/react';
import Link from 'next/link';
import { Block } from '../block/block';
import { ProfileMenu } from '../profile-menu/profile-menu';
import { useTheme } from './theme.hook';

export default function Nav() {
  const { themName, toggleTheme } = useTheme();

  return (
    <AppBar component="nav">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href={`/`}>
            <Typography
              href="/"
              component="a"
              variant="h1"
              noWrap
              sx={{
                fontSize: '2rem',
                letterSpacing: '.3rem',
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

            <Button
              sx={{ color: 'white', display: 'block' }}
              onClick={toggleTheme}
            >
              {themName}
            </Button>
            <ProfileMenu />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
