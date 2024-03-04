'use client';

import { useMutation } from '@apollo/client';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import { UserInputUpdatePassword } from '__generated__/graphql';
import { object, string } from 'yup';
import { UPDATE_USER_PASSWORD } from 'graphql/mutations/mutations';
import { useError } from 'utils/hooks';
import Divider from '@mui/material/Divider/Divider';
import { Form } from '@/components/form/form';
import { Row } from '@/components/row/row';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import { ModalContent } from '@/components/modal/content/content';
import { Modal } from '@/components/modal/modal';
import { ModalTitle } from '@/components/modal/title/title';

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
      <ModalTitle id="modal-change-user-password-title">
        Change Password
      </ModalTitle>

      <ModalContent>
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
            <Form noValidate onSubmit={handleSubmit}>
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

              <Divider flexItem />

              <Row sx={{ gap: '1rem', justifyContent: 'center' }}>
                <LoadingButton
                  variant="contained"
                  color="warning"
                  loading={isSubmitting}
                  disabled={
                    Boolean(errors.oldPassword) || Boolean(errors.newPassword)
                  }
                  type="submit"
                >
                  Submit
                </LoadingButton>
                <Button
                  variant="contained"
                  disabled={isSubmitting}
                  onClick={onClose}
                >
                  Cancel
                </Button>
              </Row>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
}
