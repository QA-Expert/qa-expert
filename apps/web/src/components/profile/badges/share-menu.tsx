import Menu from '@mui/material/Menu/Menu';
import MenuItem from '@mui/material/MenuItem/MenuItem';
import Typography from '@mui/material/Typography/Typography';

type Props = {
  ancherEl: HTMLElement | null;
  onClose: () => void;
};

export function ShareMenu({ ancherEl, onClose }: Props) {
  const shareMenuItems = [
    {
      name: 'LinkedIn',
      handleClick: () => {
        console.log('create post on linkedIn');
      },
    },
    {
      name: 'Facebook',
      handleClick: () => {
        console.log('create post on facebook');
      },
    },
  ];

  return (
    <Menu
      sx={{ mt: '2.5rem' }}
      id="share-badge-menu"
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
      {shareMenuItems.map((item, i) => (
        <MenuItem key={i} onClick={item.handleClick}>
          <Typography width={'100%'} textAlign="center">
            {item.name}
          </Typography>
        </MenuItem>
      ))}
    </Menu>
  );
}
