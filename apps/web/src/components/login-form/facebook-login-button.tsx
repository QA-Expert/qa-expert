'use client';

import { useMutation } from '@apollo/client';
import { LoginSocialFacebook } from 'reactjs-social-login';
import { LOGIN_SOCIAL } from 'graphql/mutations/mutations';
import { useError } from 'utils/hooks';
import { SocialIcon } from 'react-social-icons';
import { isAuthenticated } from 'apollo/store';
import IconButton from '@mui/material/IconButton/IconButton';

type Props = {
  onSubmit: () => void;
  onStart?: () => void;
};

function FacebookLogin({ onSubmit, onStart }: Props) {
  const [login, { error }] = useMutation(LOGIN_SOCIAL);

  useError([error?.message]);

  return (
    <LoginSocialFacebook
      isOnlyGetToken
      onLoginStart={onStart}
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
      <IconButton>
        <SocialIcon network="facebook" />
      </IconButton>
    </LoginSocialFacebook>
  );
}

export default FacebookLogin;
