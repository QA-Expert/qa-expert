import { useQuery } from '@apollo/client';
import { User } from 'graphql-schema-gen/schema.gen';
import { useRouter } from 'next/router';
import { createContext, ReactNode, useContext } from 'react';
import { GET_USER } from '../graphql/quieries/quieries';

const AuthUserContext = createContext<User | null | undefined>(null);

interface Props {
  children: ReactNode;
}

export const AuthUserProvider = ({ children }: Props) => {
  const router = useRouter();
  const shouldAuth =
    router.pathname !== '/login' && router.pathname !== '/register';
  const { data, error } = useQuery<{ user: User | null }>(GET_USER, {
    skip: !shouldAuth || !router.isReady,
  });

  if (error) {
    router.push('/login');
  }

  return (
    <AuthUserContext.Provider value={data?.user}>
      {children}
    </AuthUserContext.Provider>
  );
};

export const useUser = () => useContext(AuthUserContext);
