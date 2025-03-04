'use client';

import { useApolloClient, useMutation, useReactiveVar } from '@apollo/client';
import { usePathname, useRouter } from 'next/navigation';
import { LOGOUT } from 'graphql/mutations/mutations';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Box } from '@/components/box/box';
import { useError } from 'utils/hooks';
import { GET_ALL_COURSES_PUBLIC, GET_USER } from 'graphql/queries/queries';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { isAuthenticated } from 'apollo/store';
import { getUsername, stringAvatar } from 'utils/utils';
import { matchesPathname } from 'utils/url';
import { PUBLIC_ROUTES } from 'constants/constants';
import { DropdownMenu } from '../../dropdown-menu/dropdown-menu';

export const ProfileMenu = () => {
  const isUserAuthenticated = useReactiveVar(isAuthenticated);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const path = usePathname();
  const client = useApolloClient();
  const [logout, { error }] = useMutation(LOGOUT, {
    refetchQueries: [
      {
        query: GET_ALL_COURSES_PUBLIC,
      },
    ],
  });
  const { data, error: userError } = useSuspenseQuery(GET_USER, {
    skip: !isUserAuthenticated,
  });
  const user = data?.user;
  const username = getUsername(user);

  useError([error?.message, userError?.message]);

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
        await client.clearStore();
        await client.cache.reset();

        await logout();

        const isPublicPath = PUBLIC_ROUTES.find((expectedPath) =>
          matchesPathname(expectedPath, path),
        );

        if (isPublicPath) {
          isAuthenticated(false);
        } else {
          router.push('/courses');
        }
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
          <Avatar
            alt={user?.firstName ?? "user's avatar icon"}
            src=""
            {...stringAvatar(username)}
          />
        </IconButton>
      </Tooltip>

      <DropdownMenu
        menuItems={menuItems}
        onClose={handleCloseUserMenu}
        ancherEl={anchorElUser}
      >
        {user?.firstName && (
          <Typography
            sx={{ padding: '0.5rem' }}
            textAlign="center"
            fontWeight="bold"
          >{`${user?.firstName} ${user?.lastName}`}</Typography>
        )}
        {user?.firstName && <Divider />}
      </DropdownMenu>
    </Box>
  );
};
