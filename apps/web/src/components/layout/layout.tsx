import { ReactNode } from 'react';
import Footer from '@/components/footer/footer';
import Main from '@/components/main/main';
import Nav from '@/components/nav/nav';

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <Nav />
      <Main>{children}</Main>
      <Footer />
    </>
  );
}
