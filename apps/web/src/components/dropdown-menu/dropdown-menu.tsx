import MuiMenu from '@mui/material/Menu/Menu';
import MenuItem from '@mui/material/MenuItem/MenuItem';
import Typography from '@mui/material/Typography/Typography';
import { ReactNode } from 'react';

type Props = {
  ancherEl: HTMLElement | null;
  onClose: () => void;
  menuItems: {
    name: string;
    handleClick: () => void;
  }[];
  children?: ReactNode;
};

export function DropdownMenu({
  ancherEl,
  onClose,
  menuItems,
  children,
}: Props) {
  return (
    <MuiMenu
      sx={{ mt: '2.5rem' }}
      anchorEl={ancherEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(ancherEl)}
      onClose={onClose}
    >
      {children ? children : null}

      {menuItems.map((item, i) => (
        <MenuItem key={i} onClick={item.handleClick}>
          <Typography width={'100%'} textAlign="center">
            {item.name}
          </Typography>
        </MenuItem>
      ))}
    </MuiMenu>
  );
}
