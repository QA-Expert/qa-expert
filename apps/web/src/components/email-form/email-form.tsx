import { Formik, FormikProps, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { EmailInput } from '__generated__/graphql';
import styled from '@emotion/styled';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import Button from '@mui/material/Button/Button';
import _ from 'lodash';
import TextField from '@mui/material/TextField/TextField';
import { TextEditor } from '@/components/text-editor/text-editor';
import { Box } from '@/components/box/box';
import Typography from '@mui/material/Typography/Typography';
import { BorderBox } from '@/components/box/border-box';

type Props = {
  onSubmit: (values: EmailInput) => Promise<void>;
  onCancel?: () => void;
  inputNames: {
    subject: string;
    text: string;
  };
};

export function EmailForm({ onSubmit, onCancel, inputNames }: Props) {
  const subjectCap = _.capitalize(inputNames.subject);
  const textCap = _.capitalize(inputNames.text);

  const schema = Yup.object().shape({
    subject: Yup.string()
      .required(`${subjectCap} is a required field`)
      .max(100, `${subjectCap} should not be more that 100 characters long`),
    text: Yup.string()
      .required(`${textCap} should not be empty`)
      .max(1000, `${textCap} should not be more that 500 characters long`),
  });
  const initialValues: EmailInput = {
    subject: '',
    text: '',
  };

  return (
    <Formik
      validationSchema={schema}
      initialValues={initialValues}
      onSubmit={async (
        values: EmailInput,
        actions: FormikHelpers<EmailInput>,
      ) => {
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
      }: FormikProps<EmailInput>) => (
        <Form noValidate onSubmit={handleSubmit}>
          <FormControl>
            <TextField
              variant="outlined"
              label={subjectCap}
              autoComplete="on"
              type="text"
              name={inputNames.subject}
              id="subject"
              placeholder={`Enter ${subjectCap} ...`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.subject}
              error={Boolean(errors.subject)}
            />
            <FormHelperText
              error={Boolean(errors.subject)}
              id={'subject-error-text'}
            >
              {errors.subject}
            </FormHelperText>
          </FormControl>

          <FormControl>
            <Box>
              <Typography variant="h6" sx={{ gap: '1rem' }}>
                Body
              </Typography>
              <BorderBox sx={{ minHeight: '160px' }}>
                <TextEditor
                  onChange={(value) => {
                    const event = {
                      target: {
                        value,
                      },
                    };

                    handleChange(event);
                  }}
                  readOnly={false}
                  allowFormatting
                />
              </BorderBox>
            </Box>
            <FormHelperText error={Boolean(errors.text)} id="text-error-text">
              {errors.text}
            </FormHelperText>
          </FormControl>

          <LoadingButton
            color="warning"
            variant="contained"
            loading={isSubmitting}
            disabled={
              isSubmitting || Boolean(errors.subject) || Boolean(errors.text)
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
            Cancel
          </Button>
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
