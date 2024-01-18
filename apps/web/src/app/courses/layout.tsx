import Layout from '@/components/layout/layout';
import { Suspense } from 'react';

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout>
      <Suspense fallback={'...Loading'}>{children}</Suspense>
    </Layout>
  );
}
