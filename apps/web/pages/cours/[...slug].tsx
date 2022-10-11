import {
  Cours as CoursType,
  CoursPage as CoursPageType,
} from 'graphql-schema-gen/schema.gen';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { ReactElement } from 'react';
import client from '../../appolo-client';
import { Block } from '../../src/components/block/block';
import CoursPage from '../../src/components/cours-page/cours-page';
import Layout from '../../src/components/layout/layout';
import { PageCarousel } from '../../src/components/page-carousel/page-carousel';
import Sidebar from '../../src/components/sidebar/sidebar';
import { GET_COURS } from '../../src/graphql/quieries/quieries';
import { NextPageWithLayout } from '../_app';

const Cours: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  return (
    <>
      <Sidebar />
      <Block
        size="fill"
        orientation="column"
        css={{
          justifyContent: 'start',
          padding: '$4',
        }}
      >
        <h1>{props?.cours?.title}</h1>
        <h2>{props?.cours?.desciption}</h2>
        <span>{props?.cours?.icon}</span>
        <Block css={{ flexGrow: 1 }} size="fill">
          <PageCarousel
            pages={props?.cours?.coursPages}
            getPage={(page: CoursPageType) => <CoursPage {...page} />}
          />
        </Block>
      </Block>
    </>
  );
};

Cours.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Cours;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { slug } = context.query;

  if (!slug?.length) {
    return {
      props: {
        cours: null,
      },
    };
  }

  const { data } = await client.query<{
    cours: CoursType;
  }>({
    query: GET_COURS,
    variables: {
      coursId: slug[0],
    },
  });

  return {
    props: {
      cours: data.cours,
    },
  };
}
