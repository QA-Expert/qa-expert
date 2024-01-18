import { Box } from '@/components/box/box';
import Layout from '@/components/layout/layout';
import { Row } from '@/components/row/row';
import { Suspense } from 'react';

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
        <Box
          sx={{
            height: '100%',
            width: '100%',
            flexGrow: 1,
          }}
        >
          <Suspense fallback={'...Loading'}>{children}</Suspense>
        </Box>
      </Row>
    </Layout>
  );
}
