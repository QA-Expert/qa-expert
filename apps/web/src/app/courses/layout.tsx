import Layout from '@/components/layout/layout';
import { Row } from '@/components/row/row';

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout>
      <Row
        sx={{
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: '2rem',
          padding: '2rem',
          flexWrap: 'wrap',
        }}
      >
        {children}
      </Row>
    </Layout>
  );
}
