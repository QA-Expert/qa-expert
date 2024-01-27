'use client';

import { useMutation } from '@apollo/client';
import { LoginSocialFacebook } from 'reactjs-social-login';
import { LOGIN_SOCIAL } from 'graphql/mutations/mutations';
import { useError } from 'utils/hooks';
import { FacebookLoginButton } from 'react-social-login-buttons';
import { isAuthenticated } from 'apollo/store';

type Props = {
  onSubmit: () => void;
  onLoginStart?: () => void;
};

function FacebookLogin({ onSubmit, onLoginStart }: Props) {
  const [login, { error }] = useMutation(LOGIN_SOCIAL);

  useError([error?.message]);

  return (
    <LoginSocialFacebook
      isOnlyGetToken
      onLoginStart={onLoginStart}
      appId={process.env.NEXT_PUBLIC_AUTH_FACEBOOK_CLIENT_ID || ''}
      onResolve={async ({ provider, data }) => {
        if (data?.accessToken) {
          const { data: loginData, errors } = await login({
            variables: {
              accessToken: data.accessToken,
              provider,
              userId: data.userID,
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
      <FacebookLoginButton />
    </LoginSocialFacebook>
  );
}

export default FacebookLogin;
