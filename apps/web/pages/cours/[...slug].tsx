import { Cours } from 'graphql-schema/schema.gen';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { Fragment, ReactElement } from 'react';
import client from '../../appolo-client';
import { Content } from '../../src/components/content/content';
import Layout from '../../src/components/layout/layout';
import Sidebar from '../../src/components/sidebar/sidebar';
import { GET_COURS } from '../../src/graphql/quieries/quieries';
import { NextPageWithLayout } from '../_app';

const CoursPage: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  return (
    <>
      <Sidebar />
      <Content size="fill">
        <h1>{props?.cours?.title}</h1>
        <h2>{props?.cours?.desciption}</h2>
        <span>{props?.cours?.icon}</span>
        {props?.cours?.coursPages.map((page, i) => {
          return (
            <Fragment key={i}>
              <div>{page.title}</div>
              <div>{page.desciption}</div>
              <div>{page.content}</div>
            </Fragment>
          );
        })}
      </Content>
    </>
  );
};

CoursPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default CoursPage;

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
    cours: Cours;
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
