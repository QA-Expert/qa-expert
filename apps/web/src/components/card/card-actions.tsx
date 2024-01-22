import ButtonGroup from '@mui/material/ButtonGroup';
import MuiCardActions from '@mui/material/CardActions';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { ShareIcon } from '@/components/icons/share';
import { useState } from 'react';
import { DropdownMenu } from '../dropdown-menu/dropdown-menu';

export function CardActions({ courseId }: { courseId: string }) {
  const theme = useTheme();
  const [anchorElShareButton, setAnchorElShareButton] =
    useState<null | HTMLElement>(null);

  const handleOpenShareMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElShareButton(event.currentTarget);
  };

  const handleCloseShareMenu = () => {
    setAnchorElShareButton(null);
  };

  const shareMenuItems = [
    {
      name: 'Copy Course Link',
      handleClick: () => {
        navigator.clipboard.writeText(
          `${global.window.location.host}/courses/#course-${courseId}`,
        );
      },
    },
  ];

  return (
    <>
      <MuiCardActions
        sx={{
          display: 'flex',
          gap: '0.5rem',
          marginTop: 'auto',
          alignSelf: 'start',
          width: '100%',
          paddingRight: 0,
        }}
      >
        <ButtonGroup
          aria-label="course card actions button group"
          sx={{ flex: '1' }}
        >
          <IconButton
            aria-label="share"
            onClick={async (e) => {
              e.preventDefault();
              handleOpenShareMenu(e);
            }}
          >
            <ShareIcon
              width="24"
              height="24"
              color={theme.palette.secondary.main}
            />
          </IconButton>
        </ButtonGroup>
      </MuiCardActions>

      <DropdownMenu
        onClose={handleCloseShareMenu}
        ancherEl={anchorElShareButton}
        menuItems={shareMenuItems}
      />
    </>
  );
}
