'use client';

import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import { convertNumberToString } from 'utils/utils';
import { Duration, formatISODuration } from 'date-fns';

type Props = {
  duration: Duration;
};

export function Timer({ duration }: Props) {
  return (
    <div role="timer">
      <Time dateTime={formatISODuration(duration)}>
        {duration.days && duration.days > 0 ? (
          <span>{duration.days} d</span>
        ) : null}

        <Unit
          color="secondary"
          label={duration.hours ? convertNumberToString(duration.hours) : '00'}
        />

        <span>{':'}</span>

        <Unit
          color="secondary"
          label={
            duration.minutes ? convertNumberToString(duration.minutes) : '00'
          }
        />

        <span>{':'}</span>

        <Unit
          color="secondary"
          label={
            duration.seconds ? convertNumberToString(duration.seconds) : '00'
          }
        />
      </Time>
    </div>
  );
}

const Time = styled('time')(() => ({
  fontSize: '1.125rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.5rem',
}));

const Unit = styled(Chip)(() => ({
  width: '3rem',
  height: '3rem',
  borderRadius: '2rem',
  fontSize: '1.125rem',
}));
