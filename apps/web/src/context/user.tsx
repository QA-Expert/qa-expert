import { User } from 'graphql-schema-gen/schema.gen';
import { createContext, ReactNode, useContext } from 'react';

const UserContext = createContext<User | null | undefined>(null);

interface Props {
  children: ReactNode;
  user: User | null;
}

export const UserProvider = ({ children, user }: Props) => {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
