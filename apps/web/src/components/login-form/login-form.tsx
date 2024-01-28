'use client';

import { Formik, FormikProps, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useApolloClient, useMutation } from '@apollo/client';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';
import Link from 'next/link';
import { useError } from 'utils/hooks';
import { UserInputLogin } from '__generated__/graphql';
import { LOGIN } from 'graphql/mutations/mutations';
import { isAuthenticated } from 'apollo/store';
import styled from '@emotion/styled';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import Button from '@mui/material/Button/Button';
import { Row } from '@/components/row/row';
import { useState } from 'react';
import Divider from '@mui/material/Divider/Divider';
import dynamic from 'next/dynamic';
import { SocialButtonsSkeleton } from '@/components/skeleton/social-buttons-skeleton';

const GoogleLogin = dynamic(
  () => import('@/components/login-form/google-login-button'),
  {
    ssr: false,
    loading: SocialButtonsSkeleton,
  },
);

const FacebookLogin = dynamic(
  () => import('@/components/login-form/facebook-login-button'),
  {
    ssr: false,
    loading: SocialButtonsSkeleton,
  },
);

const LinkedInLogin = dynamic(
  () => import('@/components/login-form/linkedin-login-button'),
  {
    ssr: false,
    loading: SocialButtonsSkeleton,
  },
);

type Props = {
  onSubmit: () => void;
  onLinkClick?: () => void;
  onCancel?: () => void;
};

export function LoginForm({ onSubmit, onLinkClick, onCancel }: Props) {
  const [hasSocialLoginStarted, setHasSocialLoginStarted] = useState(false);
  const client = useApolloClient();
  const [login, { error }] = useMutation(LOGIN);
  const schema = Yup.object().shape({
    email: Yup.string()
      .required('Email is a required field')
      .email('Invalid email format'),
    password: Yup.string()
      .required('Password is a required field')
      .min(2, 'Password must be at least 2 characters'),
  });
  const initialValues: UserInputLogin = {
    email: '',
    password: '',
  };

  useError([error?.message]);

  return (
    <>
      <Formik
        validationSchema={schema}
        initialValues={initialValues}
        onSubmit={async (
          values: UserInputLogin,
          actions: FormikHelpers<UserInputLogin>,
        ) => {
          actions.setSubmitting(true);

          const { data, errors } = await login({
            variables: values,
          });

          await client.resetStore();

          actions.setSubmitting(false);

          if (errors) {
            throw errors;
          }

          if (data?.login?.access_token) {
            isAuthenticated(true);

            onSubmit();
          }
        }}
      >
        {({
          values,
          handleChange,
          isSubmitting,
          handleSubmit,
          handleBlur,
          errors,
        }: FormikProps<UserInputLogin>) => (
          <Form noValidate onSubmit={handleSubmit}>
            <FormControl>
              <InputLabel htmlFor="email">Email address</InputLabel>
              <Input
                autoComplete="on"
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email ..."
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={Boolean(errors.email)}
              />
              <FormHelperText
                error={Boolean(errors.email)}
                id="email-error-text"
              >
                {errors.email}
              </FormHelperText>
            </FormControl>

            <FormControl>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                autoComplete="on"
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password ..."
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                error={Boolean(errors.password)}
              />
              <FormHelperText
                error={Boolean(errors.password)}
                id="password-error-text"
              >
                {errors.password}
              </FormHelperText>
            </FormControl>

            <Typography>
              {'If you do not have an account, please '}
              <MuiLink href="/register" onClick={onLinkClick} component={Link}>
                register
              </MuiLink>
              .
            </Typography>

            <MuiLink
              href="/forgot-password"
              onClick={onLinkClick}
              component={Link}
            >
              Need help?
            </MuiLink>

            <Row
              sx={{
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
              }}
            >
              <LoadingButton
                color="warning"
                variant="contained"
                loading={isSubmitting}
                disabled={
                  isSubmitting ||
                  Boolean(errors.email) ||
                  Boolean(errors.password) ||
                  hasSocialLoginStarted
                }
                type="submit"
              >
                Login
              </LoadingButton>

              {onCancel ? (
                <Button variant="contained" onClick={onCancel}>
                  Cancel
                </Button>
              ) : null}
            </Row>
          </Form>
        )}
      </Formik>
      <Divider
        variant="fullWidth"
        flexItem
        sx={{
          color: 'secondary.main',
          '&::before, &::after': { backgroundColor: 'warning.main' },
        }}
      >
        or use
      </Divider>

      <Row sx={{ justifyContent: 'center' }}>
        <GoogleLogin
          onStart={() => setHasSocialLoginStarted(true)}
          onSubmit={() => {
            setHasSocialLoginStarted(false);

            onSubmit();
          }}
        />
        <FacebookLogin
          onStart={() => setHasSocialLoginStarted(true)}
          onSubmit={() => {
            setHasSocialLoginStarted(false);

            onSubmit();
          }}
        />
        <LinkedInLogin
          onStart={() => setHasSocialLoginStarted(true)}
          onSubmit={() => {
            setHasSocialLoginStarted(false);

            onSubmit();
          }}
        />
      </Row>
    </>
  );
}

const Form = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1rem',
});
