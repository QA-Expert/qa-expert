'use client';

import Main from '../../src/components/main/main';
import { Formik, FormikProps, FormikHelpers } from 'formik';
import { UserInputCreate } from '../../src/__generated__/graphql';
import * as Yup from 'yup';
import { REGISTER } from '../../src/graphql/mutations/mutations';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Link from 'next/link';
import { Box } from '../../src/components/box/box';
import { useError } from '../../utils/hooks';
import { useApolloClient, useMutation } from '@apollo/client';

function Register() {
  const client = useApolloClient();
  const [register, { error }] = useMutation(REGISTER);

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

  return (
    <Main>
      <Formik
        validationSchema={schema}
        initialValues={initialValues}
        onSubmit={async (
          values: UserInputCreate,
          actions: FormikHelpers<UserInputCreate>,
        ) => {
          actions.setSubmitting(true);
          await client.resetStore();

          const { data, errors } = await register({
            variables: values,
          });

          actions.setSubmitting(false);

          if (errors) {
            throw errors;
          }

          if (data?.register?.access_token) {
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
        }: FormikProps<UserInputCreate>) => (
          <form noValidate onSubmit={handleSubmit}>
            <Paper
              sx={{
                gap: '1rem',
                padding: '2rem',
              }}
              component={Box}
            >
              <Typography sx={{ fontSize: '2rem' }} variant="h1">
                Register
              </Typography>

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
                <Link href="/login">
                  <MuiLink>login</MuiLink>
                </Link>
                .
              </Typography>

              <Button
                variant="contained"
                disabled={
                  isSubmitting ||
                  Boolean(errors.email) ||
                  Boolean(errors.password)
                }
                type="submit"
              >
                Register
              </Button>
            </Paper>
          </form>
        )}
      </Formik>
    </Main>
  );
}

export default Register;
