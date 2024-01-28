'use client';

import { Box } from '@/components/box/box';
import Divider from '@mui/material/Divider/Divider';
import Typography from '@mui/material/Typography/Typography';
import { ProgressCard } from './card';
import { useTheme } from '@mui/material/styles';
import { Course, States } from './progress';

type Props = {
  courses: Course[];
  state: States;
  title: string;
};

export function CoursesList({ courses, state, title }: Props) {
  const theme = useTheme();

  return (
    <>
      <Typography
        sx={{
          color: state === 'COMPLETED' ? 'success.main' : 'secondary.main',
          textTransform: 'uppercase',
        }}
      >
        {title}
      </Typography>

      <Box
        key={state}
        sx={{
          width: '100%',
          padding: '1rem',
          border: `1px solid ${theme.palette.secondary.main}`,
          borderRadius: '1rem',
          gap: '1rem',
        }}
      >
        {courses.length === 0 ? (
          <Typography sx={{ color: 'text.secondary' }}>
            Please start taking courses to see the progress
          </Typography>
        ) : null}

        {courses.map((course, i) => (
          <Box key={course._id} sx={{ gap: '1rem', width: '100%' }}>
            {i > 0 ? (
              <Divider
                flexItem
                variant="fullWidth"
                sx={{ backgroundColor: 'warning.main' }}
              />
            ) : null}

            <ProgressCard
              course={course}
              showPRogressBar={state !== 'COMPLETED'}
            />
          </Box>
        ))}
      </Box>
    </>
  );
}
