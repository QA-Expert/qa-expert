'use client';

import { Box } from '@/components/box/box';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import Divider from '@mui/material/Divider/Divider';
import Typography from '@mui/material/Typography/Typography';
import { useTheme } from '@mui/material/styles';
import {
  CourseProgressState,
  GetSubmittedUserProgressesUserQuery,
} from '__generated__/graphql';
import { GET_SUBMITTED_USER_PROGRESSES } from 'graphql/queries/queries';
import { useError } from 'utils/hooks';
import { getGroupedCoursesByState } from './handlers';
import { ProgressCard } from './card';

export type Course =
  GetSubmittedUserProgressesUserQuery['submittedProgresses'][number]['course'];

export type States = 'COMPLETED' | CourseProgressState.InProgress;

export function Progress() {
  const { data, error } = useSuspenseQuery(GET_SUBMITTED_USER_PROGRESSES);
  const theme = useTheme();

  useError([error?.message]);

  const groupedByState = getGroupedCoursesByState(data.submittedProgresses);

  const states = Object.keys(groupedByState) as States[];

  return (
    <Box sx={{ width: '100%', gap: '2rem' }}>
      {states.map((state) => {
        const courses = groupedByState[state];

        return (
          <>
            <Typography
              sx={{
                color:
                  state === 'COMPLETED' ? 'success.main' : 'secondary.main',
              }}
            >
              {state}
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
                  Please start your courses to see the progress
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

                  <ProgressCard course={course} />
                </Box>
              ))}
            </Box>
          </>
        );
      })}
    </Box>
  );
}
