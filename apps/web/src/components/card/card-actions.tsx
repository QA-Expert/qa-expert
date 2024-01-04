import ButtonGroup from '@mui/material/ButtonGroup';
import MuiCardActions from '@mui/material/CardActions';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { LikeIcon } from '@/components/icons/like';
import { ShareIcon } from '@/components/icons/share';

export function CardActions() {
  const theme = useTheme();

  return (
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
          aria-label="add to favorites"
          onClick={async (e) => {
            e.preventDefault();
          }}
        >
          <LikeIcon
            width="24"
            height="24"
            color={theme.palette.secondary.main}
          />
        </IconButton>

        <IconButton
          aria-label="share"
          onClick={async (e) => {
            e.preventDefault();
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
  );
}
