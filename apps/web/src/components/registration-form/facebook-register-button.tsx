'use client';

import { useMutation } from '@apollo/client';
import { LoginSocialFacebook } from 'reactjs-social-login';
import { REGISTER_SOCIAL } from 'graphql/mutations/mutations';
import { useError } from 'utils/hooks';
import { SocialIcon } from 'react-social-icons';
import IconButton from '@mui/material/IconButton/IconButton';

type Props = {
  onSubmit: () => void;
  onStart?: () => void;
};

function FacebookRegister({ onSubmit, onStart }: Props) {
  const [register, { error }] = useMutation(REGISTER_SOCIAL);

  useError([error?.message]);

  return (
    <LoginSocialFacebook
      isOnlyGetToken
      onLoginStart={onStart}
      appId={process.env.NEXT_PUBLIC_AUTH_FACEBOOK_CLIENT_ID || ''}
      onResolve={async ({ provider, data }) => {
        if (data?.accessToken) {
          const { data: loginData, errors } = await register({
            variables: {
              accessToken: data.accessToken,
              provider,
              userId: data.userID,
            },
          });

          if (errors) {
            throw errors;
          }

          if (loginData?.registerSocial?.access_token) {
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

export default FacebookRegister;
