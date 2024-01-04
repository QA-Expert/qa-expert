'use client';

import Chip from '@mui/material/Chip';
import { useTheme } from '@mui/material/styles';
import { CourseLevel } from '__generated__/graphql';
import { styled } from '@mui/material/styles';
import { getBackgroundColorForLevelLabel } from './handlers';

type Props = {
  level: CourseLevel;
  isMinified?: boolean;
};

export function CourseLevelLabel({ level, isMinified }: Props) {
  const theme = useTheme();

  return (
    <Label
      sx={{
        backgroundColor: getBackgroundColorForLevelLabel(level, theme),
      }}
      label={isMinified ? level.toUpperCase()[0] : level.toUpperCase()}
    />
  );
}

const Label = styled(Chip)(({ theme }) => ({
  fontSize: '0.75rem',
  borderRadius: '0 0.75rem 0',
  color: theme.palette.primary.main,
}));
