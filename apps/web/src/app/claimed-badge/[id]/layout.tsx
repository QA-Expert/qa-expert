import Layout from '@/components/layout/layout';

export default function BadgeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}
