import Chip from '@mui/material/Chip';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';

export type Direction = 'left' | 'right';

type Props = {
  text: string;
  direction?: Direction;
};

export function Flag({ text, direction = 'right' }: Props) {
  const theme = useTheme();

  return (
    <StyledFlag
      sx={{
        backgroundColor: theme.palette.warning.main,
      }}
      label={text.toUpperCase()}
      direction={direction}
    ></StyledFlag>
  );
}

const StyledFlag = styled(Chip, {
  // NOTE: Configure which props should be forwarded on DOM
  // https://mui.com/system/styled/#custom-components
  shouldForwardProp: (prop) => prop !== 'direction',
})<{ direction: Direction }>(({ theme, direction }) => ({
  fontWeight: 900,
  paddingLeft: direction === 'left' ? '1.5rem' : 0,
  paddingRight: direction === 'right' ? '1.5rem' : 0,
  fontSize: '0.75rem',
  borderRadius: '0',
  backgroundColor: theme.palette.warning.main,
  color: theme.palette.primary.main,
  clipPath:
    direction === 'left'
      ? 'polygon(100% 0, 100% 100%, 0% 100%, 20% 50%, 0% 0%)'
      : 'polygon(100% 0, 80% 50%, 100% 100%, 0% 100%, 0% 0%)',
}));
