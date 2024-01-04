'use client';

import { ApolloNextAppProvider } from '@apollo/experimental-nextjs-app-support/ssr';
import { makeClient } from 'apollo/rsc_client';
import { ReactNode } from 'react';

type Props = {
  token: string | null;
  children: ReactNode;
};

export function ApolloWrapper(props: Props) {
  return (
    <ApolloNextAppProvider makeClient={makeClient(props.token)}>
      {props.children}
    </ApolloNextAppProvider>
  );
}
