import { Formik, FormikProps, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import Main from '../src/components/main/main';
import { Box } from '../src/components/box/box';
import { FORGOT_PASSWORD } from '../src/graphql/mutations/mutations';
import { useError } from '../utils/hooks';

function ForgotPassword() {
  const [forgotPassword, { error }] = useMutation(FORGOT_PASSWORD);

  useError(error?.message);

  const schema = Yup.object().shape({
    email: Yup.string()
      .required('Email is a required field')
      .email('Invalid email format'),
  });
  const initialValues = {
    email: '',
  };
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
          <Typography sx={{ fontSize: '1rem' }} variant="h1">
            Email with instructions was sent
          </Typography>
          <Typography>Please check your inbox for our email</Typography>
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

            const { errors } = await forgotPassword({
              variables: {
                email: values.email,
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
                  Forgot Password
                </Typography>

                <FormControl>
                  <InputLabel htmlFor="email">
                    Please enter your email
                  </InputLabel>
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

                <Button
                  disabled={isSubmitting || Boolean(errors.email)}
                  type="submit"
                >
                  Submit
                </Button>
              </Paper>
            </form>
          )}
        </Formik>
      )}
    </Main>
  );
}

export default ForgotPassword;
