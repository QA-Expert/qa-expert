import Main from '../src/components/main/main';
import { Formik, FormikProps, FormikHelpers } from 'formik';
import { UserInputLogin } from 'graphql-schema-gen/schema.gen';
import * as Yup from 'yup';
import { LOGIN } from '../src/graphql/mutations/mutations';
import { useApolloClient, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import {
  Button,
  FormControl,
  FormHelperText,
  Box,
  Input,
  InputLabel,
  Typography,
} from '@mui/material';

function Login() {
  const client = useApolloClient();
  const [login] = useMutation(LOGIN);
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

  return (
    <Main>
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
            await router.push('/');
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
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1rem',
              flexDirection: 'column',
            }}
            direction="column"
            component="form"
            noValidate
            onSubmit={handleSubmit}
          >
            <Typography sx={{ fontSize: '2rem' }} variant="h1">
              Login
            </Typography>

            <FormControl>
              <InputLabel htmlFor="email">Email address</InputLabel>
              <Input
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
              <InputLabel htmlFor="email">Password</InputLabel>
              <Input
                autoComplete="on"
                type="password"
                name="password"
                id="password"
                placeholder="Password your email ..."
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

            <Button
              disabled={
                isSubmitting ||
                Boolean(errors.email) ||
                Boolean(errors.password)
              }
              type="submit"
            >
              Login
            </Button>
          </Box>
        )}
      </Formik>
    </Main>
  );
}

export default Login;
