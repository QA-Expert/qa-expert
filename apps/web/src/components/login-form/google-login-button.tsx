'use client';

import { useMutation } from '@apollo/client';
import { LoginSocialGoogle } from 'reactjs-social-login';
import { LOGIN_SOCIAL } from 'graphql/mutations/mutations';
import { useError } from 'utils/hooks';
import { GoogleLoginButton } from 'react-social-login-buttons';

function GoogleLogin() {
  const [login, { error }] = useMutation(LOGIN_SOCIAL);

  useError([error?.message]);

  return (
    <LoginSocialGoogle
      isOnlyGetToken
      client_id={process.env.NEXT_PUBLIC_AUTH_GOOGLE_CLIENT_ID || ''}
      onResolve={async ({ provider, data }) => {
        console.log(data);
        console.log(provider);

        if (data?.access_token) {
          const { errors } = await login({
            variables: {
              accessToken: data.access_token,
              provider,
            },
          });

          if (errors) {
            throw errors;
          }
        }
      }}
      onReject={(err) => {
        console.log('ERROR', err);
      }}
    >
      <GoogleLoginButton />
    </LoginSocialGoogle>
  );
}

export default GoogleLogin;
