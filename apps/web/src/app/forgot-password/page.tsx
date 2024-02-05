'use client';

import { Formik, FormikProps, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { Box } from '@/components/box/box';
import { FORGOT_PASSWORD } from 'graphql/mutations/mutations';
import { useError } from 'utils/hooks';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import Divider from '@mui/material/Divider/Divider';
import { Form } from '@/components/form/form';
import { ModalTitle } from '@/components/modal/title/title';

function ForgotPassword() {
  const [forgotPassword, { error }] = useMutation(FORGOT_PASSWORD);

  useError([error?.message]);

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
          <ModalTitle>Email with instructions was sent</ModalTitle>

          <Typography>Please check your inbox for our email</Typography>
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
            <Form noValidate onSubmit={handleSubmit}>
              <ModalTitle>Forgot Password</ModalTitle>

              <FormControl>
                <InputLabel htmlFor="email">Please enter your email</InputLabel>
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

              <Divider flexItem />

              <LoadingButton
                color="warning"
                variant="contained"
                loading={isSubmitting}
                disabled={isSubmitting || Boolean(errors.email)}
                type="submit"
              >
                Submit
              </LoadingButton>
            </Form>
          )}
        </Formik>
      )}
    </Paper>
  );
}

export default ForgotPassword;
