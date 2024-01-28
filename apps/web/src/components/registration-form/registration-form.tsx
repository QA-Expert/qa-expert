'use client';

import { Formik, FormikProps, FormikHelpers } from 'formik';
import { UserInputCreate } from '__generated__/graphql';
import * as Yup from 'yup';
import { REGISTER } from 'graphql/mutations/mutations';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';
import Link from 'next/link';
import { useError } from 'utils/hooks';
import { useApolloClient, useMutation } from '@apollo/client';
import { isAuthenticated } from 'apollo/store';
import { GET_USER } from 'graphql/queries/queries';
import Divider from '@mui/material/Divider/Divider';
import { Row } from '@/components/row/row';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { SocialButtonsSkeleton } from '@/components/skeleton/social-buttons-skeleton';

const GoogleRegister = dynamic(
  () => import('@/components/registration-form/google-register-button'),
  {
    ssr: false,
    loading: SocialButtonsSkeleton,
  },
);

const FacebookRegister = dynamic(
  () => import('@/components/registration-form/facebook-register-button'),
  {
    ssr: false,
    loading: SocialButtonsSkeleton,
  },
);

const LinkedInRegister = dynamic(
  () => import('@/components/registration-form/linkedin-register-button'),
  {
    ssr: false,
    loading: SocialButtonsSkeleton,
  },
);

export function RegistrationForm() {
  const [hasSocialRegisterStarted, setHasSocialRegisterStarted] =
    useState(false);
  const client = useApolloClient();
  const [register, { error }] = useMutation(REGISTER, {
    refetchQueries: [
      {
        query: GET_USER,
      },
    ],
  });

  useError([error?.message]);

  const schema = Yup.object().shape({
    email: Yup.string()
      .required('Email is a required field')
      .email('Invalid email format'),
    password: Yup.string()
      .required('Password is a required field')
      .min(2, 'Password must be at least 2 characters'),
    firstName: Yup.string().nullable().max(100, 'First Name is too long'),
    lastName: Yup.string().nullable().max(100, 'Last Name is too long'),
  });
  const initialValues: UserInputCreate = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  };
  const router = useRouter();

  const handleOnSubmit = () => {
    isAuthenticated(true);

    router.push('/');
  };

  return (
    <>
      <Formik
        validationSchema={schema}
        initialValues={initialValues}
        onSubmit={async (
          values: UserInputCreate,
          actions: FormikHelpers<UserInputCreate>,
        ) => {
          actions.setSubmitting(true);

          await client.clearStore();
          await client.cache.reset();

          const { data, errors } = await register({
            variables: values,
          });

          actions.setSubmitting(false);

          if (errors) {
            throw errors;
          }

          if (data?.register?.access_token) {
            handleOnSubmit();
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
        }: FormikProps<UserInputCreate>) => (
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
                autoComplete="new-password"
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

            <FormControl>
              <InputLabel htmlFor="first-name">First Name</InputLabel>
              <Input
                autoComplete="on"
                type="text"
                name="firstName"
                id="first-name"
                placeholder="Enter your first name ..."
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
                error={Boolean(errors.firstName)}
              />
              <FormHelperText
                error={Boolean(errors.firstName)}
                id="first-name-error-text"
              >
                {errors.firstName}
              </FormHelperText>
            </FormControl>

            <FormControl>
              <InputLabel htmlFor="last-name">Last Name</InputLabel>
              <Input
                autoComplete="on"
                type="text"
                name="lastName"
                id="last-name"
                placeholder="Enter your last name ..."
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastName}
                error={Boolean(errors.lastName)}
              />
              <FormHelperText
                error={Boolean(errors.lastName)}
                id="last-name-error-text"
              >
                {errors.lastName}
              </FormHelperText>
            </FormControl>

            <Typography>
              {'If you already have an account, please '}
              <MuiLink href="/login" component={Link}>
                login
              </MuiLink>
              .
            </Typography>

            <Button
              color="warning"
              variant="contained"
              disabled={
                isSubmitting ||
                Boolean(errors.email) ||
                Boolean(errors.password) ||
                hasSocialRegisterStarted
              }
              type="submit"
            >
              Register
            </Button>
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
        <GoogleRegister
          onStart={() => setHasSocialRegisterStarted(true)}
          onSubmit={() => {
            setHasSocialRegisterStarted(false);
            handleOnSubmit();
          }}
        />
        <FacebookRegister
          onStart={() => setHasSocialRegisterStarted(true)}
          onSubmit={() => {
            setHasSocialRegisterStarted(false);
            handleOnSubmit();
          }}
        />
        <LinkedInRegister
          onStart={() => setHasSocialRegisterStarted(true)}
          onSubmit={() => {
            setHasSocialRegisterStarted(false);
            handleOnSubmit();
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
