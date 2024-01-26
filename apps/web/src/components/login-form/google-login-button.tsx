import { useMutation } from '@apollo/client';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import { useGoogleLogin } from '@react-oauth/google';
import { LOGIN_WITH_GOOGLE } from 'graphql/mutations/mutations';
import { useError } from 'utils/hooks';

export function GoogleLoginButton() {
  const [login, { error }] = useMutation(LOGIN_WITH_GOOGLE);
  const handleOnClick = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log(codeResponse);
      login({
        variables: {
          code: codeResponse.code,
          scope: codeResponse.scope,
        },
      });
    },
    flow: 'auth-code',
  });

  useError([error?.message]);

  return (
    <LoadingButton onClick={() => handleOnClick()}>
      Login with google
    </LoadingButton>
  );
}
