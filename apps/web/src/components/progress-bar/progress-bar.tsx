import { Box } from '../box/box';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { GET_COURSE_PROGRESS_AND_BADGE } from '../../graphql/queries/queries';
import { useQuery } from '@apollo/client';

type Props = {
  _id: string;
};

export function ProgressBar({ _id }: Props) {
  const { data: courseData } = useQuery(GET_COURSE_PROGRESS_AND_BADGE, {
    variables: { _id },
  });
  const course = courseData?.course;
  const progress = course?.progress;
  const hasNoProgress = !progress?.pass && !progress?.fail;

  return (
    <Box sx={{ width: '100%', height: '2rem', justifyContent: 'flex-end' }}>
      <Box
        role={hasNoProgress ? 'progressbar' : undefined}
        aria-valuemin={hasNoProgress ? 0 : undefined}
        aria-valuemax={hasNoProgress ? 100 : undefined}
        aria-label={hasNoProgress ? 'Empty progress bar' : undefined}
        aria-valuenow={hasNoProgress ? 0 : undefined}
        sx={{
          justifyContent: hasNoProgress ? 'center' : 'start',
          width: '100%',
          gap: '0',
          flexDirection: 'row',
          height: '0.25rem',
          backgroundColor: 'background',
        }}
      >
        {hasNoProgress && (
          <Typography sx={{ position: 'relative', top: '-1rem' }}>
            0%
          </Typography>
        )}

        {progress?.pass ? (
          //TODO: turn into styled  component
          <Box
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Percentage of passed pages"
            aria-valuenow={progress.pass}
            sx={{
              width: `${progress.pass}%`,
              height: 'inherit',
              backgroundColor: 'secondary.main',
              position: 'relative',
            }}
          >
            {/* TODO: turn into styled  component */}
            <Tooltip title={`${progress.pass}%`} arrow disableFocusListener>
              <Typography
                sx={{
                  padding: '0 0.25rem 0 0.25rem',
                  position: 'relative',
                  top: '-1rem',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  fontSize: '0.875rem',
                }}
              >
                {progress.pass}%
              </Typography>
            </Tooltip>
          </Box>
        ) : null}

        {progress?.fail ? (
          //TODO: turn into styled  component
          <Box
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Percentage of failed pages"
            aria-valuenow={progress.fail}
            sx={{
              width: `${progress.fail}%`,
              height: 'inherit',
              backgroundColor: 'warning.main',
              position: 'relative',
            }}
          >
            {/* TODO: turn into styled  component */}
            <Tooltip title={`${progress.fail}%`} arrow disableFocusListener>
              <Typography
                sx={{
                  padding: '0 0.25rem 0 0.25rem',
                  position: 'relative',
                  top: '-1rem',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  fontSize: '0.875rem',
                }}
              >
                {progress.fail}%
              </Typography>
            </Tooltip>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}
