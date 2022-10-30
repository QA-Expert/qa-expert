import { Box } from '../box/box';
import { ProgressPercentage as Props } from 'graphql-schema-gen/schema.gen';
import Typography from '@mui/material/Typography';

export function ProgressBar(props: Props) {
  const hasNoProgress = !props.pass && !props.fail;
  console.log(props.pass);
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
        height: '1.25rem',
        borderRadius: '0.25rem',
        backgroundColor: 'grey.400',
      }}
    >
      {hasNoProgress && (
        <Typography sx={{ position: 'absolute' }}>0%</Typography>
      )}

      {props?.pass ? (
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
            borderStartEndRadius: 0,
            borderEndEndRadius: 0,
            backgroundColor: 'success.main',
          }}
        >
          <Typography sx={{ position: 'absolute' }}>{props.pass}%</Typography>
        </Box>
      ) : null}
      {props?.fail ? (
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
            borderStartStartRadius: 0,
            borderEndStartRadius: 0,
            backgroundColor: 'error.main',
          }}
        >
          <Typography sx={{ position: 'absolute' }}>{props.fail}%</Typography>
        </Box>
      ) : null}
    </Box>
  );
}
