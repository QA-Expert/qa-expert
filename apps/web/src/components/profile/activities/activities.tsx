'use client';

import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { GET_USER_ACTIVITIES } from 'graphql/queries/queries';
import { useError } from 'utils/hooks';
import { ActivityCard } from './card';
import { Row } from '@/components/row/row';

export function Activities() {
  const { data, error } = useSuspenseQuery(GET_USER_ACTIVITIES);

  useError([error?.message]);

  return (
    <Row sx={{ flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
      {data.activities.map((activity) => (
        <ActivityCard key={activity._id} {...activity} />
      ))}
    </Row>
  );
}
