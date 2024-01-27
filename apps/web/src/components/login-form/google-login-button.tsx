'use client';

import { useMutation } from '@apollo/client';
import { LoginSocialGoogle } from 'reactjs-social-login';
import { LOGIN_SOCIAL } from 'graphql/mutations/mutations';
import { useError } from 'utils/hooks';
import { GoogleLoginButton } from 'react-social-login-buttons';
import { isAuthenticated } from 'apollo/store';

type Props = {
  onSubmit: () => void;
  onLoginStart?: () => void;
};

function GoogleLogin({ onSubmit, onLoginStart }: Props) {
  const [login, { error }] = useMutation(LOGIN_SOCIAL);

  useError([error?.message]);

  return (
    <LoginSocialGoogle
      isOnlyGetToken
      onLoginStart={onLoginStart}
      client_id={process.env.NEXT_PUBLIC_AUTH_GOOGLE_CLIENT_ID || ''}
      onResolve={async ({ provider, data }) => {
        if (data?.access_token) {
          const { data: loginData, errors } = await login({
            variables: {
              accessToken: data.access_token,
              provider,
            },
          });

          if (errors) {
            throw errors;
          }

          if (loginData?.loginSocial?.access_token) {
            isAuthenticated(true);

            onSubmit();
          }
        }
      }}
      onReject={(err) => {
        console.error(err);
      }}
    >
      <GoogleLoginButton />
    </LoginSocialGoogle>
  );
}

export default GoogleLogin;
