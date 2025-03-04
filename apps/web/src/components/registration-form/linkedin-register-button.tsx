'use client';

import { useMutation } from '@apollo/client';
import { LoginSocialLinkedin } from 'reactjs-social-login';
import { REGISTER_SOCIAL } from 'graphql/mutations/mutations';
import { useError } from 'utils/hooks';
import { SocialIcon } from 'react-social-icons';
import { AUTH_REDIRECT_URI } from 'constants/constants';
import IconButton from '@mui/material/IconButton/IconButton';

type Props = {
  onSubmit: () => void;
  onStart?: () => void;
};

function LinkedInRegister({ onSubmit, onStart }: Props) {
  const [register, { error }] = useMutation(REGISTER_SOCIAL);

  useError([error?.message]);

  return (
    <LoginSocialLinkedin
      isOnlyGetToken
      onLoginStart={onStart}
      /**
       * @NOTE: have to setup scope manually as current default scope that lib sets does not match required scope in linkedin auth settings
       */
      scope={'openid,profile,w_member_social,email'}
      client_id={process.env.NEXT_PUBLIC_AUTH_LINKEDIN_CLIENT_ID || ''}
      client_secret={process.env.NEXT_PUBLIC_AUTH_LINKEDIN_CLIENT_SECRET || ''}
      onResolve={async ({ provider, data }) => {
        /**
         * we are using id_token instead of access_token as we don't need access_token
         * as we are not going to talk to linkedin api on back end
         * id_token has all of the info we need to auth use without calling linkedin api
         * @url https://www.linkedin.com/developers/news/featured-updates/openid-connect-authentication
         */
        if (data?.id_token) {
          const { data: loginData, errors } = await register({
            variables: {
              accessToken: data.id_token,
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
      redirect_uri={AUTH_REDIRECT_URI}
    >
      <IconButton>
        <SocialIcon network="linkedin" />
      </IconButton>
    </LoginSocialLinkedin>
  );
}

export default LinkedInRegister;
