import { Box } from '../box/box';
import { TotalCourseProgress as Props } from '../../__generated__/graphql';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

export function ProgressBar(props: Props) {
  const hasNoProgress = !props.pass && !props.fail;

  return (
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
        height: '1.5rem',
        borderRadius: '0.25rem',
        backgroundColor: 'grey.400',
      }}
    >
      {hasNoProgress && (
        <Typography sx={{ position: 'absolute' }}>0%</Typography>
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
            borderRadius: 'inherit',
            borderStartEndRadius: props.fail ? 0 : 'inherit',
            borderEndEndRadius: props.fail ? 0 : 'inherit',
            backgroundColor: 'success.main',
          }}
        >
          {/* TODO: turn into styled  component */}
          <Tooltip title={`${props.pass}%`} arrow disableFocusListener>
            <Typography
              sx={{
                padding: '0 0.25rem 0 0.25rem',
                position: 'absolute',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                flex: 1,
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
            borderRadius: 'inherit',
            borderStartStartRadius: props.pass ? 0 : 'inherit',
            borderEndStartRadius: props.pass ? 0 : 'inherit',
            backgroundColor: 'error.main',
          }}
        >
          {/* TODO: turn into styled  component */}
          <Tooltip title={`${props.fail}%`} arrow disableFocusListener>
            <Typography
              sx={{
                padding: '0 0.25rem 0 0.25rem',
                position: 'absolute',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                flex: 1,
              }}
            >
              {props.fail}%
            </Typography>
          </Tooltip>
        </Box>
      ) : null}
    </Box>
  );
}
