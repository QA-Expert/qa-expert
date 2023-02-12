import {
  CourseProgressState,
  PageProgressState,
} from '../../__generated__/graphql';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { getColorForState } from '../../../utils/utils';
import { useTheme } from '@mui/material/styles';

type Props = {
  state: PageProgressState | CourseProgressState | undefined;
};

export function StatusIndicator(
  //TODO: unified states into one string union
  { state }: Props,
) {
  const theme = useTheme();

  return !state || state === CourseProgressState.InProgress ? (
    <CheckCircleOutlineIcon />
  ) : (
    <CheckCircleIcon sx={{ color: getColorForState(state, theme) }} />
  );
}
