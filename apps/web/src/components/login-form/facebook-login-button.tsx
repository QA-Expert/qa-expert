'use client';

import { useMutation } from '@apollo/client';
import { LoginSocialFacebook } from 'reactjs-social-login';
import { LOGIN_SOCIAL } from 'graphql/mutations/mutations';
import { useError } from 'utils/hooks';
import { FacebookLoginButton } from 'react-social-login-buttons';

function GoogleLogin() {
  const [login, { error }] = useMutation(LOGIN_SOCIAL);

  useError([error?.message]);

  return (
    <LoginSocialFacebook
      isOnlyGetToken
      appId={process.env.NEXT_PUBLIC_AUTH_FACEBOOK_CLIENT_ID || ''}
      onResolve={async ({ provider, data }) => {
        console.log(data);
        console.log(provider);

        if (data?.accessToken) {
          const { errors } = await login({
            variables: {
              accessToken: data.accessToken,
              provider,
            },
          });

          if (errors) {
            throw errors;
          }
        }
      }}
      onReject={(err) => {
        console.log(err);
      }}
    >
      <FacebookLoginButton />
    </LoginSocialFacebook>
  );
}

export default GoogleLogin;
