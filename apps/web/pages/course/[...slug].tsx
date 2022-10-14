import { useQuery } from '@apollo/client';
import {
  Course as CourseType,
  CoursePage as CoursePageType,
} from 'graphql-schema-gen/schema.gen';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { Block } from '../../src/components/block/block';
import CoursePage from '../../src/components/course-page/course-page';
import Layout from '../../src/components/layout/layout';
import { PageCarousel } from '../../src/components/page-carousel/page-carousel';
import Sidebar from '../../src/components/sidebar/sidebar';
import { GET_COURSE } from '../../src/graphql/quieries/quieries';

const Course = () => {
  const route = useRouter();
  const slug = route.query.slug ? route.query.slug[0] : null;

  const { loading, data, error } = useQuery<{
    course: CourseType;
  }>(GET_COURSE, {
    variables: { courseId: slug },
    skip: !slug,
  });

  /* TODO: Add TOASTS */
  if (error) {
    return null;
  }

  if (!data) {
    return null;
  }
  return (
    <>
      <Sidebar>Test</Sidebar>
      <Block
        size="fill"
        orientation="column"
        css={{
          justifyContent: 'start',
          padding: '$4',
        }}
      >
        {/* TODO: Add Loading indicator */}
        {loading && <p>..... LOADING ......</p>}

        <h1>{data.course.title}</h1>
        <h2>{data.course.desciption}</h2>
        <span>{data.course.icon}</span>
        <Block css={{ flexGrow: 1 }} size="fill">
          <PageCarousel
            pages={data.course.coursePages}
            getPage={(page: CoursePageType) => <CoursePage {...page} />}
          />
        </Block>
      </Block>
    </>
  );
};

Course.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Course;
