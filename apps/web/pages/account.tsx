import { ReactElement } from 'react';
import { Block } from '../src/components/block/block';
import Layout from '../src/components/layout/layout';

function Account() {
  return (
    <Block>
      <h1>Account</h1>
    </Block>
  );
}

Account.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Account;
