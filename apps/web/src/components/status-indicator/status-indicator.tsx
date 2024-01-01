import {
  CourseProgressState,
  PageProgressState,
} from '../../__generated__/graphql';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { getColorForState } from '../../../utils/utils';
import { useTheme } from '@mui/material/styles';
import { SvgIconTypeMap } from '@mui/material';

type Props = {
  state: PageProgressState | CourseProgressState | undefined;
} & SvgIconTypeMap['props'];

export function StatusIndicator(
  //TODO: unified states into one string union
  { state, ...props }: Props,
) {
  const theme = useTheme();

  return !state || state === CourseProgressState.InProgress ? (
    <CheckCircleOutlineIcon {...props} />
  ) : (
    <CheckCircleIcon
      {...props}
      sx={{ ...props.sx, color: getColorForState(state, theme) }}
    />
  );
}
