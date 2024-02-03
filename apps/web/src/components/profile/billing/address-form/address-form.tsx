import { Formik, FormikProps, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import styled from '@emotion/styled';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import Button from '@mui/material/Button/Button';
import TextField from '@mui/material/TextField/TextField';

import { Row } from '@/components/row/row';
import { Address } from '@stripe/stripe-js';

type Props = {
  onSubmit: (values: Address) => Promise<void>;
  onCancel?: () => void;
};

export function AddressForm({ onSubmit, onCancel }: Props) {
  const schema = Yup.object().shape({
    city: Yup.string().required('Please enter city name'),
    country: Yup.string().required('Please enter country name'),
    line1: Yup.string().required('Please enter street number and name'),
    line2: Yup.string().optional(),
    postal_code: Yup.string().required('Please enter postal or zip code'),
    state: Yup.string().required('Please select state'),
  });
  const initialValues: Address = {
    city: '',
    country: '',
    line1: '',
    line2: '',
    postal_code: '',
    state: '',
  };

  return (
    <Formik
      validationSchema={schema}
      initialValues={initialValues}
      onSubmit={async (values: Address, actions: FormikHelpers<Address>) => {
        actions.setSubmitting(true);

        await onSubmit(values);

        actions.setSubmitting(false);
      }}
    >
      {({
        values,
        handleChange,
        isSubmitting,
        handleSubmit,
        handleBlur,
        errors,
      }: FormikProps<Address>) => (
        <Form noValidate onSubmit={handleSubmit}>
          <FormControl sx={{ width: '100%' }}>
            <TextField
              variant="outlined"
              label={'Street line 1'}
              autoComplete="on"
              type="text"
              name="line1"
              id="line1"
              placeholder={`Enter Street number and name ...`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.line1}
              error={Boolean(errors.line1)}
            />
            <FormHelperText
              error={Boolean(errors.line1)}
              id={'line1-error-text'}
            >
              {errors.line1}
            </FormHelperText>
          </FormControl>

          <FormControl sx={{ width: '100%' }}>
            <TextField
              variant="outlined"
              label={'Street line 2 (optional)'}
              autoComplete="on"
              type="text"
              name="line2"
              id="line2"
              placeholder={`Enter Street number and name ...`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.line2}
              error={Boolean(errors.line2)}
            />
            <FormHelperText
              error={Boolean(errors.line2)}
              id={'line2-error-text'}
            >
              {errors.line2}
            </FormHelperText>
          </FormControl>

          <Row sx={{ gap: '1rem', justifyContent: 'center' }}>
            <LoadingButton
              color="warning"
              variant="contained"
              loading={isSubmitting}
              disabled={isSubmitting || Boolean(Object.values(errors).length)}
              type="submit"
            >
              Submit
            </LoadingButton>

            <Button
              color="secondary"
              variant="contained"
              type="submit"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Row>
        </Form>
      )}
    </Formik>
  );
}

const Form = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1rem',
});
