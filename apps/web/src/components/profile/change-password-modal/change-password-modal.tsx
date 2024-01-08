'use client';

import { useMutation } from '@apollo/client';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import { UserInputUpdatePassword } from '__generated__/graphql';
import { object, string } from 'yup';
import { UPDATE_USER_PASSWORD } from 'graphql/mutations/mutations';
import { Box } from '@/components/box/box';
import { useError } from 'utils/hooks';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function ChangePasswordModal({ open, onClose }: Props) {
  const [updateUserPassword, { error }] = useMutation(UPDATE_USER_PASSWORD);

  useError([error?.message]);

  const initialValues: UserInputUpdatePassword = {
    newPassword: '',
    oldPassword: '',
  };
  const schema = object().shape({
    newPassword: string()
      .required('Password is a required field')
      .min(2, 'Password must be at least 2 characters'),
    oldPassword: string()
      .required('Password is a required field')
      .min(2, 'Password must be at least 2 characters'),
  });

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-change-user-password"
      aria-describedby="Modal where user can change password"
    >
      <>
        <Formik
          validationSchema={schema}
          initialValues={initialValues}
          onSubmit={async (
            values: UserInputUpdatePassword,
            actions: FormikHelpers<UserInputUpdatePassword>,
          ) => {
            actions.setSubmitting(true);

            const { errors } = await updateUserPassword({
              variables: values,
            });

            actions.setSubmitting(false);

            if (errors) {
              throw errors;
            }

            onClose();
          }}
        >
          {({
            values,
            handleChange,
            isSubmitting,
            handleSubmit,
            handleBlur,
            errors,
          }: FormikProps<UserInputUpdatePassword>) => (
            <form noValidate onSubmit={handleSubmit}>
              <Paper
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  minWidth: '30%',
                  minHeight: '30%',
                  gap: '1rem',
                  padding: '2rem',
                }}
                component={Box}
              >
                <Typography
                  id="modal-change-user-password-title"
                  sx={{ fontSize: '2rem' }}
                  variant="h1"
                >
                  Change password
                </Typography>
                <FormControl>
                  <InputLabel htmlFor="old-password">
                    Enter your Old Password
                  </InputLabel>
                  <Input
                    autoComplete="on"
                    type="password"
                    name="oldPassword"
                    id="old-password"
                    placeholder="Enter your Old Password ..."
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.oldPassword}
                    error={Boolean(errors.oldPassword)}
                  />
                  <FormHelperText
                    error={Boolean(errors.oldPassword)}
                    id="first-name-error-text"
                  >
                    {errors.oldPassword}
                  </FormHelperText>
                </FormControl>

                <FormControl>
                  <InputLabel htmlFor="new-password">New Password</InputLabel>
                  <Input
                    autoComplete="on"
                    type="password"
                    name="newPassword"
                    id="new-password"
                    placeholder="Enter your New Password ..."
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.newPassword}
                    error={Boolean(errors.newPassword)}
                  />
                  <FormHelperText
                    error={Boolean(errors.newPassword)}
                    id="new-password-error-text"
                  >
                    {errors.newPassword}
                  </FormHelperText>
                </FormControl>
                <Button
                  variant="contained"
                  disabled={
                    isSubmitting ||
                    Boolean(errors.oldPassword) ||
                    Boolean(errors.newPassword)
                  }
                  type="submit"
                >
                  Submit
                </Button>
              </Paper>
            </form>
          )}
        </Formik>
      </>
    </Modal>
  );
}
