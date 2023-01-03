import Main from '../src/components/main/main';
import { Formik, FormikProps, FormikHelpers } from 'formik';
import { UserInputLogin } from '../src/__generated__/graphql';
import * as Yup from 'yup';
import { LOGIN } from '../src/graphql/mutations/mutations';
import { useApolloClient, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Link from 'next/link';
import { Box } from '../src/components/box/box';
import { useError } from '../utils/hooks';

function Login() {
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
            await router.push('/courses');
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
          <form noValidate onSubmit={handleSubmit}>
            <Paper
              sx={{
                gap: '1rem',
                padding: '2rem',
              }}
              component={Box}
            >
              <Typography sx={{ fontSize: '2rem' }} variant="h1">
                Login
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
                <Link href="/register">
                  <MuiLink>register</MuiLink>
                </Link>
                .
              </Typography>

              <Link href="/forgot-password">
                <MuiLink>Need help?</MuiLink>
              </Link>

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
            </Paper>
          </form>
        )}
      </Formik>
    </Main>
  );
}

export default Login;
