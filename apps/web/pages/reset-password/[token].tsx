import { Formik, FormikProps, FormikHelpers } from 'formik';
import { ResetPasswordInput } from '../../src/__generated__/graphql';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Main from '../../src/components/main/main';
import { RESET_PASSWORD } from '../../src/graphql/mutations/mutations';
import { Box } from '../../src/components/box/box';
import { useState } from 'react';

function ResetPassword() {
  const [resetPassword] = useMutation(RESET_PASSWORD);
  const schema = Yup.object().shape({
    password: Yup.string()
      .required('New Password is a required field')
      .min(2, 'New Password must be at least 2 characters'),
  });
  const initialValues: Pick<ResetPasswordInput, 'password'> = {
    password: '',
  };
  const router = useRouter();
  const [isSuccessfullyReset, setIsSuccessfullyReset] = useState(false);

  return (
    <Main>
      {isSuccessfullyReset ? (
        <Paper
          sx={{
            minWidth: '30%',
            minHeight: '30%',
            gap: '1rem',
            padding: '2rem',
          }}
          component={Box}
        >
          <Typography sx={{ fontSize: '2rem' }} variant="h1">
            Password Successfully Reset
          </Typography>
          <Button variant="contained" href="/login">
            Login
          </Button>
        </Paper>
      ) : (
        <Formik
          validationSchema={schema}
          initialValues={initialValues}
          onSubmit={async (
            values: typeof initialValues,
            actions: FormikHelpers<typeof initialValues>,
          ) => {
            actions.setSubmitting(true);

            const { errors } = await resetPassword({
              variables: {
                data: {
                  token: router.query.token as string,
                  ...values,
                },
              },
            });

            actions.setSubmitting(false);

            if (errors) {
              throw errors;
            }

            setIsSuccessfullyReset(true);
          }}
        >
          {({
            values,
            handleChange,
            isSubmitting,
            handleSubmit,
            handleBlur,
            errors,
          }: FormikProps<typeof initialValues>) => (
            <form noValidate onSubmit={handleSubmit}>
              <Paper
                sx={{
                  minWidth: '30%',
                  minHeight: '30%',
                  gap: '1rem',
                  padding: '2rem',
                }}
                component={Box}
              >
                <Typography sx={{ fontSize: '2rem' }} variant="h1">
                  Reset Password
                </Typography>

                <FormControl>
                  <InputLabel htmlFor="password">New Password</InputLabel>
                  <Input
                    autoComplete="on"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your new password ..."
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
                  disabled={isSubmitting || Boolean(errors.password)}
                  type="submit"
                >
                  Login
                </Button>
              </Paper>
            </form>
          )}
        </Formik>
      )}
    </Main>
  );
}

export default ResetPassword;
