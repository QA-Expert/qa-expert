import { useApolloClient, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useUser } from '../../context/user';
import { LOGOUT } from '../../graphql/mutations/mutations';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Box } from '../box/box';

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
          {/* TODO: Add icon to user model */}
          <Avatar alt={user?.firstName ?? "user's avatar icon"} src="" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '2.5rem' }}
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
        {user?.firstName && (
          <Typography
            sx={{ padding: '0.5rem' }}
            textAlign="center"
            fontWeight="bold"
          >{`${user?.firstName} ${user?.lastName}`}</Typography>
        )}

        {user?.firstName && <Divider />}

        {menuItems.map((item, i) => (
          <MenuItem key={i} onClick={item.handleClick}>
            <Typography width={'100%'} textAlign="center">
              {item.name}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
