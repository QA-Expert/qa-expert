import { ReactNode } from 'react';
import Footer from '../footer/footer';
import Main from '../main/main';
import Nav from '../nav/nav';

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
