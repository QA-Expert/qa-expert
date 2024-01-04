'use client';

import { Formik, FormikProps, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useApolloClient, useMutation } from '@apollo/client';
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
import { UserInputLogin } from '__generated__/graphql';
import { LOGIN } from 'graphql/mutations/mutations';
import { isAuthenticated } from 'apollo/store';
import styled from '@emotion/styled';

type Props = {
  onSubmit?: () => void;
};

export function LoginForm({ onSubmit }: Props) {
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
  const router = useRouter();

  useError([error?.message]);

  return (
    <Formik
      validationSchema={schema}
      initialValues={initialValues}
      onSubmit={async (
        values: UserInputLogin,
        actions: FormikHelpers<UserInputLogin>,
      ) => {
        actions.setSubmitting(true);

        await client.resetStore();

        const { data, errors } = await login({
          variables: values,
        });

        actions.setSubmitting(false);

        if (errors) {
          throw errors;
        }

        if (data?.login?.access_token) {
          isAuthenticated(true);

          onSubmit && onSubmit();

          router.back();
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
            <FormHelperText error={Boolean(errors.email)} id="email-error-text">
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
            <MuiLink href="/register" component={Link}>
              register
            </MuiLink>
            .
          </Typography>

          <MuiLink href="/forgot-password" component={Link}>
            Need help?
          </MuiLink>

          <Button
            variant="contained"
            disabled={
              isSubmitting || Boolean(errors.email) || Boolean(errors.password)
            }
            type="submit"
          >
            Login
          </Button>
        </Form>
      )}
    </Formik>
  );
}

const Form = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  justifyContent: 'center',
  alignItems: 'center',
});
