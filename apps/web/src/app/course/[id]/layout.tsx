import Layout from '@/components/layout/layout';
import { Row } from '@/components/row/row';
import { getClient } from 'apollo/ssr_client';
import { GET_COURSE_PUBLIC_META_DATA } from 'graphql/queries/queries';
import { Metadata } from 'next/types';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id;

  const { data } = await getClient().query({
    query: GET_COURSE_PUBLIC_META_DATA,
    variables: { _id: id },
  });

  const { title, description, level, type } = data.coursePublic;

  return {
    title,
    description: `${description}. Type: ${type}, Level: ${level}`,
  };
}

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout>
      <Row
        sx={{
          width: '100%',
          height: '100%',
          flex: 1,
          padding: '1rem',
          gap: '1rem',
          borderRadius: 0,
          position: 'relative',
        }}
      >
        {children}
      </Row>
    </Layout>
  );
}
