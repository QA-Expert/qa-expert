import { Block } from '../src/components/block/block';
import { Button } from '../src/components/button/button';
import { Input } from '../src/components/input/input';
import Main from '../src/components/main/main';
import { Formik, FormikProps, FormikHelpers, ErrorMessage } from 'formik';
import { UserInputLogin } from 'graphql-schema-gen/schema.gen';
import * as Yup from 'yup';
import { ErrorMessage as ErrorMessageComponent } from '../src/components/error-message/error-message';
import { LOGIN } from '../src/graphql/mutations/mutations';
import { useApolloClient, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

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
          <Block
            orientation="column"
            as="form"
            css={{
              gap: '$3',
              width: '25%',
            }}
            noValidate
            onSubmit={handleSubmit}
          >
            <h1>Login</h1>

            <Block
              orientation="column"
              css={{ alignItems: 'start', gap: '$1' }}
            >
              <label htmlFor="email">Email:</label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email ..."
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <ErrorMessage name="email" component={ErrorMessageComponent} />
            </Block>

            <Block
              orientation="column"
              css={{ alignItems: 'start', gap: '$1' }}
            >
              <label htmlFor="password">Password:</label>
              <Input
                autoComplete="on"
                type="password"
                name="password"
                id="password"
                placeholder="Password your email ..."
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              <ErrorMessage name="password" component={ErrorMessageComponent} />
            </Block>

            <Button
              disabled={
                isSubmitting ||
                Boolean(errors.email) ||
                Boolean(errors.password)
              }
              bg="primary"
              size="lg"
              type="submit"
            >
              Login
            </Button>
          </Block>
        )}
      </Formik>
    </Main>
  );
}

export default Login;
