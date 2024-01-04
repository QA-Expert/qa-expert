import Layout from '@/components/layout/layout';

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}
