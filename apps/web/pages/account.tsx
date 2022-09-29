import { ReactElement } from 'react';
import Content from '../src/components/content/content';
import Layout from '../src/components/layout/layout';

function Account() {
  return (
    <Content>
      <h1>Account</h1>
    </Content>
  );
}

Account.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Account;
