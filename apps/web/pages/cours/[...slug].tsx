import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import Content from '../../src/components/content/content';
import Layout from '../../src/components/layout/layout';
import Sidebar from '../../src/components/sidebar/sidebar';
import { NextPageWithLayout } from '../_app';

const CoursPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <>
      <Sidebar />
      <Content>
        <h1>Cours #{slug}</h1>
      </Content>
    </>
  );
};

CoursPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default CoursPage;
