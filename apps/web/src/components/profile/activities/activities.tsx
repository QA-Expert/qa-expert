'use client';

import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { GET_USER_ACTIVITIES } from 'graphql/queries/queries';
import { useError } from 'utils/hooks';
import { ActivityCard } from './card';
import { Row } from '@/components/row/row';
import Typography from '@mui/material/Typography/Typography';

export function Activities() {
  const { data, error } = useSuspenseQuery(GET_USER_ACTIVITIES);

  useError([error?.message]);

  return (
    <Row sx={{ flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
      {data.activities.length === 0 ? (
        <Typography sx={{ color: 'text.secondary' }}>
          Please start taking courses to see activities
        </Typography>
      ) : null}

      {data.activities.map((activity) => (
        <ActivityCard key={activity._id} {...activity} />
      ))}
    </Row>
  );
}
