import Layout from '@/components/layout/layout';
import { Row } from '@/components/row/row';

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
