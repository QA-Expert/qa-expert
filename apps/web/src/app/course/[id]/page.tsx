'use client';

import { Pages } from '@/components/pages/pages';
import { GET_COURSE } from 'graphql/queries/queries';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { useParams } from 'next/navigation';

/**
 * @description Routing App component that represents a root for a Course
 */
const Course = () => {
  const params = useParams();
  const { data } = useSuspenseQuery(GET_COURSE, {
    variables: { _id: params.id as string },
  });

  return <Pages pages={data.course.pages} courseInfo={data.course} />;
};

export default Course;
