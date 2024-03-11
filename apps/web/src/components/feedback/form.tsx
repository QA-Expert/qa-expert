import { Formik, FormikProps, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import Button from '@mui/material/Button/Button';
import { Row } from '@/components/row/row';
import Divider from '@mui/material/Divider/Divider';
import { Form } from '@/components/form/form';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField/TextField';

type Props = {
  onCancel: () => void;
  onSubmit: (values: Values) => void;
};

export type Values = {
  rating: number | null;
  text: string;
};

export function FeedbackForm({ onCancel, onSubmit }: Props) {
  const schema = Yup.object().shape({
    rating: Yup.number().required(),
    text: Yup.string()
      .optional()
      .max(500, `Text should not be more that 500 characters long`),
  });
  const initialValues: Values = {
    rating: null,
    text: '',
  };

  return (
    <Formik
      validationSchema={schema}
      initialValues={initialValues}
      onSubmit={async (values: Values, actions: FormikHelpers<Values>) => {
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
      }: FormikProps<typeof initialValues>) => (
        <Form noValidate onSubmit={handleSubmit}>
          <FormControl>
            <Rating
              id="rating"
              name="rating"
              value={values.rating}
              onChange={handleChange}
            />
            <FormHelperText
              sx={{ margin: 0 }}
              error={Boolean(errors.rating)}
              id={'rating-error-text'}
            >
              {errors.rating}
            </FormHelperText>
          </FormControl>

          <FormControl sx={{ width: '100%' }}>
            <TextField
              aria-label="feedback-text"
              minRows={4}
              multiline
              autoComplete="on"
              name="text"
              id="text"
              placeholder={`Enter feedback ...`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.text}
            />
            <FormHelperText error={Boolean(errors.text)} id={'text-error-text'}>
              {errors.text}
            </FormHelperText>
          </FormControl>

          <Divider flexItem />

          <Row sx={{ gap: '1rem', justifyContent: 'center' }}>
            <LoadingButton
              color="warning"
              variant="contained"
              loading={isSubmitting}
              disabled={
                isSubmitting || Boolean(errors.rating) || Boolean(errors.text)
              }
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
              Maybe later
            </Button>
          </Row>
        </Form>
      )}
    </Formik>
  );
}
