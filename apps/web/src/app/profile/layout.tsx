import Layout from '@/components/layout/layout';
import { Row } from '@/components/row/row';

export default function ProfileLayout({
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
