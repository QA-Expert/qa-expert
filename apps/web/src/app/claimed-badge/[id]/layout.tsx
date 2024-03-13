import Layout from '@/components/layout/layout';
import { getClient } from 'apollo/ssr_client';
import { Metadata } from 'next/types';
import { GET_CLAIMED_BADGE } from 'graphql/queries/queries';
import { Row } from '@/components/row/row';
import { getStudentName } from 'utils/utils';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id;

  const { data } = await getClient().query({
    query: GET_CLAIMED_BADGE,
    variables: { _id: id },
  });

  const { user, badge } = data.claimedBadge;
  const studentName = getStudentName(user);

  return {
    title: `QA Expert - ${badge.title}`,
    description: `QA Expert - ${badge.description}`,
    openGraph: {
      title: `QA Expert - ${badge.title}`,
      description: `We're thrilled to congratulate ${studentName} for successfully completing our ${badge.course?.title} course!`,
      images: [
        {
          url: '/images/badge-default-icon_bg.png',
        },
      ],
      type: 'website',
      url: `https://qaexpert-7g2rd.ondigitalocean.app/claimed-badge/${id}`,
      siteName: 'QA Expert',
    },
  };
}

export default function BadgeLayout({
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
          gap: '1rem',
          padding: '1rem',
          flexWrap: 'wrap',
        }}
      >
        {children}
      </Row>
    </Layout>
  );
}
