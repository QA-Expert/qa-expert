import { useApolloClient, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useUser } from '../../context/auth';
import { LOGOUT } from '../../graphql/mutations/mutations';
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState } from 'react';

export const ProfileMenu = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const client = useApolloClient();
  const [logout] = useMutation(LOGOUT);
  const user = useUser();
  const menuItems = [
    {
      name: 'Profile',
      handleClick: () => {
        router.push('/profile');
      },
    },
    {
      name: 'Logout',
      handleClick: async () => {
        await logout();
        await router.push('/login');
        await client.resetStore();
      },
    },
  ];

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={user?.firstName ?? "user's avatar icon"} src="" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {menuItems.map((item, i) => (
          <MenuItem key={i} onClick={item.handleClick}>
            <Typography textAlign="center">{item.name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
