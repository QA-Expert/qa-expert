import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { Box } from '../src/components/box/box';
import Layout from '../src/components/layout/layout';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import Modal from '@mui/material/Modal';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import { UserInputUpdate } from 'graphql-schema-gen/schema.gen';
import * as Yup from 'yup';
import IconButton from '@mui/material/IconButton';
import { UPDATE_USER } from '../src/graphql/mutations/mutations';
import { useMutation } from '@apollo/client';
import { useAtom } from 'jotai';
import { userAtom } from '../src/store';

function Account() {
  const [user, setUser] = useAtom(userAtom);
  const [editUserNamesModalOpen, setEditUserNamesModalOpen] = useState(false);
  const [updateUser] = useMutation(UPDATE_USER);
  const initialValues: UserInputUpdate = {
    firstName: user?.firstName ?? '',
    lastName: user?.lastName ?? '',
  };
  const schema = Yup.object().shape({
    firstName: Yup.string().nullable().max(100, 'First Name is too long'),
    lastName: Yup.string().nullable().max(100, 'Last Name is too long'),
  });

  const handleOpenEditUserNamesModal = () => {
    setEditUserNamesModalOpen(true);
  };
  const handleCloseEditUserNameModal = () => {
    setEditUserNamesModalOpen(false);
  };

  return (
    <Layout>
      <Box
        sx={{
          flexDirection: 'row',
          width: '100%',
          height: '100%',
          gap: '2rem',
          padding: '2rem',
          flexWrap: 'wrap',
        }}
      >
        <Paper
          component={Box}
          sx={{
            justifyContent: 'start',
            flex: 1,
            height: '100%',
            padding: '2rem',
            gap: '1rem',
          }}
        >
          <Image
            width="200"
            height="200"
            src="/images/default-user-profile-image.svg"
            alt="user profile image"
          />
          <Box sx={{ flexDirection: 'row', gap: '0.5rem' }}>
            <Typography variant="h2" sx={{ fontSize: '2rem' }}>
              {user?.firstName
                ? `${user?.firstName} ${user?.lastName}`
                : user?.email}
            </Typography>
            {(user?.firstName || user?.lastName) && (
              <IconButton
                aria-label="change-user-names"
                onClick={handleOpenEditUserNamesModal}
              >
                <EditIcon color="primary" />
              </IconButton>
            )}
          </Box>
        </Paper>
        <Paper
          component={Box}
          sx={{
            justifyContent: 'start',
            height: '100%',
            flex: 3.5,
            padding: '2rem',
          }}
        >
          <Typography variant="h2" sx={{ fontSize: '2rem' }}>
            Details
          </Typography>
        </Paper>
      </Box>

      <Modal
        open={editUserNamesModalOpen}
        onClose={handleCloseEditUserNameModal}
        aria-labelledby="modal-change-user-names"
        aria-describedby="Modal where user can change first and last names"
      >
        <>
          <Formik
            validationSchema={schema}
            initialValues={initialValues}
            onSubmit={async (
              values: UserInputUpdate,
              actions: FormikHelpers<UserInputUpdate>,
            ) => {
              actions.setSubmitting(true);

              const { data, errors } = await updateUser({
                variables: values,
              });

              setUser(data.updateUser);
              actions.setSubmitting(false);

              if (errors) {
                throw errors;
              }

              setEditUserNamesModalOpen(false);
            }}
          >
            {({
              values,
              handleChange,
              isSubmitting,
              handleSubmit,
              handleBlur,
              errors,
            }: FormikProps<UserInputUpdate>) => (
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
    </Layout>
  );
}

export default Account;
