import { Box } from '../box/box';
import { TotalCourseProgress as Props } from '../../__generated__/graphql';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

export function ProgressBar(props: Props) {
  const hasNoProgress = !props.pass && !props.fail;

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
          flexDirection: 'row',
          height: '0.25rem',
          backgroundColor: 'primary.dark',
        }}
      >
        {hasNoProgress && (
          <Typography sx={{ position: 'relative', top: '-1rem' }}>
            0%
          </Typography>
        )}

        {props?.pass ? (
          //TODO: turn into styled  component
          <Box
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Percentage of passed pages"
            aria-valuenow={props.pass}
            sx={{
              width: `${props.pass}%`,
              height: 'inherit',
              backgroundColor: 'secondary.main',
              position: 'relative',
            }}
          >
            {/* TODO: turn into styled  component */}
            <Tooltip title={`${props.pass}%`} arrow disableFocusListener>
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
                {props.pass}%
              </Typography>
            </Tooltip>
          </Box>
        ) : null}

        {props?.fail ? (
          //TODO: turn into styled  component
          <Box
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Percentage of failed pages"
            aria-valuenow={props.fail}
            sx={{
              width: `${props.fail}%`,
              height: 'inherit',
              backgroundColor: 'warning.main',
              position: 'relative',
            }}
          >
            {/* TODO: turn into styled  component */}
            <Tooltip title={`${props.fail}%`} arrow disableFocusListener>
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
                {props.fail}%
              </Typography>
            </Tooltip>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}
