import Main from '../../src/components/main/main';

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Main>{children}</Main>;
}
