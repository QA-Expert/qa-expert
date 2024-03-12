'use client';

import { GET_CLAIMED_BADGE } from 'graphql/queries/queries';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Button from '@mui/material/Button/Button';

/**
 * @description Routing App component that represents a route for a Claimed Badge
 *
 * Mostly this route should be used to share badge with social media
 * Most of social media sharing takes only url
 */
const ClaimedBadge = () => {
  const params = useParams();
  const { data } = useSuspenseQuery(GET_CLAIMED_BADGE, {
    variables: { _id: params.id as string },
  });

  return (
    <>
      <div>
        <p>{data.claimedBadge.badge.title}</p>
        <p>{data.claimedBadge.badge.description}</p>
        <p>{data.claimedBadge.badge.course?.title}</p>
        <p>{data.claimedBadge.user.firstName}</p>
        <p>{data.claimedBadge.user.lastName}</p>
        <p>{data.claimedBadge.createdAt}</p>
        <Link href={`/courses#course-${data.claimedBadge.badge.course?._id}`}>
          <Button variant="contained" color="success">
            Open Course
          </Button>
        </Link>
      </div>
    </>
  );
};

export default ClaimedBadge;
