import Main from '@/components/main/main';

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Main>{children}</Main>;
}
