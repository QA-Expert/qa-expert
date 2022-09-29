import Link from 'next/link';
import { ReactElement } from 'react';
import Content from '../src/components/content/content';
import { CoursCard } from '../src/components/cours-card/cours-card';
import Layout from '../src/components/layout/layout';
import { NextPageWithLayout } from './_app';

const HomePage: NextPageWithLayout = () => {
  return (
    <>
      <Content>
        {Array.from({ length: 10 }, (_, i) => i + 1).map((item: number) => (
          <CoursCard key={item}>
            <Link href={`/cours/${item}`}>
              <a>Cours #{item}</a>
            </Link>
          </CoursCard>
        ))}
      </Content>
    </>
  );
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default HomePage;
