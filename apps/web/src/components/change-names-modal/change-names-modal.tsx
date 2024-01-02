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
import { UserInputUpdateNames } from '../../__generated__/graphql';
import { object, string } from 'yup';
import { UPDATE_USER_NAMES } from '../../graphql/mutations/mutations';
import { Box } from '../box/box';
import { GET_USER } from '../../graphql/queries/queries';
import { useError } from '../../../utils/hooks';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function ChangeNamesModal({ open, onClose }: Props) {
  const { data, error: userError } = useSuspenseQuery(GET_USER);
  const [updateUserNames, { error }] = useMutation(UPDATE_USER_NAMES, {
    refetchQueries: [{ query: GET_USER }],
  });
  const user = data?.user;

  useError([error?.message, userError?.message]);

  const initialValues: UserInputUpdateNames = {
    firstName: user?.firstName ?? '',
    lastName: user?.lastName ?? '',
  };

  const schema = object().shape({
    firstName: string().nullable().max(100, 'First Name is too long'),
    lastName: string().nullable().max(100, 'Last Name is too long'),
  });

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-change-user-names"
      aria-describedby="Modal where user can change last and first names"
    >
      <>
        <Formik
          validationSchema={schema}
          initialValues={initialValues}
          onSubmit={async (
            values: UserInputUpdateNames,
            actions: FormikHelpers<UserInputUpdateNames>,
          ) => {
            actions.setSubmitting(true);

            const { errors } = await updateUserNames({
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
          }: FormikProps<UserInputUpdateNames>) => (
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
                  id="modal-change-user-names-title"
                  sx={{ fontSize: '2rem' }}
                  variant="h1"
                >
                  Change names
                </Typography>
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
                <Button
                  variant="contained"
                  disabled={
                    isSubmitting ||
                    Boolean(errors.firstName) ||
                    Boolean(errors.lastName)
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
