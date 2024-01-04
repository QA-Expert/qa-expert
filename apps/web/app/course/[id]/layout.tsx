import { Box } from '../../../src/components/box/box';
import Layout from '../../../src/components/layout/layout';
import { Row } from '../../../src/components/row/row';

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
          {children}
        </Box>
      </Row>
    </Layout>
  );
}
