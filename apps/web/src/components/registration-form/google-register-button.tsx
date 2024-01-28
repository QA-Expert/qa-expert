'use client';

import { useMutation } from '@apollo/client';
import { LoginSocialGoogle } from 'reactjs-social-login';
import { REGISTER_SOCIAL } from 'graphql/mutations/mutations';
import { useError } from 'utils/hooks';
import { SocialIcon } from 'react-social-icons';
import IconButton from '@mui/material/IconButton/IconButton';

type Props = {
  onSubmit: () => void;
  onStart?: () => void;
};

function GoogleRegister({ onSubmit, onStart }: Props) {
  const [register, { error }] = useMutation(REGISTER_SOCIAL);

  useError([error?.message]);

  return (
    <LoginSocialGoogle
      isOnlyGetToken
      onLoginStart={onStart}
      client_id={process.env.NEXT_PUBLIC_AUTH_GOOGLE_CLIENT_ID || ''}
      onResolve={async ({ provider, data }) => {
        if (data?.access_token) {
          const { data: loginData, errors } = await register({
            variables: {
              accessToken: data.access_token,
              provider,
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
        <SocialIcon network="google" />
      </IconButton>
    </LoginSocialGoogle>
  );
}

export default GoogleRegister;
