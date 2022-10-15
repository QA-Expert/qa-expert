import { useApolloClient, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { LOGOUT } from '../../graphql/mutations/mutations';
import { Button } from '../button/button';

export const Logout = () => {
  const router = useRouter();
  const client = useApolloClient();
  const [logout] = useMutation(LOGOUT);

  const handleLogoutClick = async () => {
    await logout();
    await router.push('/login');
    await client.resetStore();
  };
  return (
    <Button
      type="button"
      bg="primary"
      position="left"
      onClick={handleLogoutClick}
    >
      Logout
    </Button>
  );
};
