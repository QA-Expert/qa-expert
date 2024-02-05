'use client';

import { Formik, FormikProps, FormikHelpers } from 'formik';
import { ResetPasswordInput } from '__generated__/graphql';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { useParams } from 'next/navigation';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Paper from '@mui/material/Paper';
import { RESET_PASSWORD } from 'graphql/mutations/mutations';
import { Box } from '@/components/box/box';
import { useState } from 'react';
import { useError } from 'utils/hooks';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import { Form } from '@/components/form/form';
import { ModalTitle } from '@/components/modal/title/title';

function ResetPassword() {
  const [resetPassword, { error }] = useMutation(RESET_PASSWORD);

  useError([error?.message]);

  const schema = Yup.object().shape({
    password: Yup.string()
      .required('New Password is a required field')
      .min(2, 'New Password must be at least 2 characters'),
  });
  const initialValues: Pick<ResetPasswordInput, 'password'> = {
    password: '',
  };
  const router = useParams();
  const [isSuccessfullyReset, setIsSuccessfullyReset] = useState(false);

  return (
    <Paper
      sx={{
        minWidth: '30%',
        minHeight: '30%',
        gap: '1rem',
      }}
      component={Box}
    >
      {isSuccessfullyReset ? (
        <>
          <ModalTitle>Password Successfully Reset</ModalTitle>

          <Button variant="contained" href="/login">
            Login
          </Button>
        </>
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
                  token: router.token as string,
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
            <Form noValidate onSubmit={handleSubmit}>
              <ModalTitle>Reset Password</ModalTitle>

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

              <LoadingButton
                color="warning"
                variant="contained"
                disabled={isSubmitting || Boolean(errors.password)}
                loading={isSubmitting}
                type="submit"
              >
                Login
              </LoadingButton>
            </Form>
          )}
        </Formik>
      )}
    </Paper>
  );
}

export default ResetPassword;
