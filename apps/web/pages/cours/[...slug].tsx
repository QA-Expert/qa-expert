import { useLazyQuery } from '@apollo/client';
import {
  Cours as CoursType,
  CoursPage as CoursPageType,
} from 'graphql-schema-gen/schema.gen';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';
import { Block } from '../../src/components/block/block';
import CoursPage from '../../src/components/cours-page/cours-page';
import Layout from '../../src/components/layout/layout';
import { PageCarousel } from '../../src/components/page-carousel/page-carousel';
import Sidebar from '../../src/components/sidebar/sidebar';
import { GET_COURS } from '../../src/graphql/quieries/quieries';

const Cours = () => {
  const route = useRouter();
  const { slug } = route.query;
  const [getData, { loading, data, error }] = useLazyQuery<{
    cours: CoursType;
  }>(GET_COURS);

  // This boilerplate is used to handle slug[0] could be undefined on first render
  useEffect(() => {
    if (slug && getData) {
      getData({
        variables: {
          coursId: slug[0],
        },
      });
    }
  }, [getData, slug]);

  /* TODO: Add TOASTS */
  if (error) {
    return null;
  }

  if (!data) {
    return null;
  }
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
        {/* TODO: Add Loading indicator */}
        {loading && <p>..... LOADING ......</p>}

        <h1>{data.cours.title}</h1>
        <h2>{data.cours.desciption}</h2>
        <span>{data.cours.icon}</span>
        <Block css={{ flexGrow: 1 }} size="fill">
          <PageCarousel
            pages={data.cours.coursPages}
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
