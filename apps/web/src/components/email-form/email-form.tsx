import { Formik, FormikProps, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { EmailInput } from '__generated__/graphql';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import Button from '@mui/material/Button/Button';
import _ from 'lodash';
import TextField from '@mui/material/TextField/TextField';
import { TextEditor } from '@/components/text-editor/text-editor';
import { Box } from '@/components/box/box';
import Typography from '@mui/material/Typography/Typography';
import { BorderBox } from '@/components/box/border-box';
import { Row } from '@/components/row/row';
import { isAuthenticated } from 'apollo/store';
import { useReactiveVar } from '@apollo/client';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { GET_USER } from 'graphql/queries/queries';
import Divider from '@mui/material/Divider/Divider';
import { Form } from '@/components/form/form';
import { getToolbarConfig } from '@/components/text-editor/handlers';

type Props = {
  onSubmit: (values: EmailInput) => Promise<void>;
  onCancel?: () => void;
  inputNames: {
    subject: string;
    text: string;
  };
};

export function EmailForm({ onSubmit, onCancel, inputNames }: Props) {
  const isUserAuthenticated = useReactiveVar(isAuthenticated);
  const user = useSuspenseQuery(GET_USER, {
    skip: !isUserAuthenticated,
  });
  const subjectCap = _.capitalize(inputNames.subject);
  const textCap = _.capitalize(inputNames.text);

  const schema = Yup.object().shape({
    from: Yup.string().when([], {
      is: () => !isUserAuthenticated,
      then: (schema) =>
        schema
          .required('Email is a required field')
          .email(`Email address is invalid`),
      otherwise: (schema) => schema.notRequired(),
    }),
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
    from: user?.data?.user.email ?? '',
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
        setFieldValue,
        setFieldError,
        errors,
      }: FormikProps<EmailInput>) => (
        <Form noValidate onSubmit={handleSubmit}>
          {!isUserAuthenticated ? (
            <FormControl sx={{ width: '100%' }}>
              <TextField
                variant="outlined"
                label="Your Email"
                autoComplete="on"
                type="email"
                name="from"
                id="from"
                placeholder={'Enter your email address ...'}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.from}
                error={Boolean(errors.from)}
              />
              <FormHelperText
                error={Boolean(errors.from)}
                id={'from-error-text'}
              >
                {errors.from}
              </FormHelperText>
            </FormControl>
          ) : null}

          <FormControl sx={{ width: '100%' }}>
            <TextField
              variant="outlined"
              label={subjectCap}
              autoComplete="on"
              type="text"
              name="subject"
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
              <Typography variant="h6" sx={{ color: 'secondary.main' }}>
                Body
              </Typography>

              <BorderBox
                sx={{
                  minHeight: '260px',
                  width: '100%',
                  borderColor: errors.text ? 'error.main' : 'secondary.main',
                }}
              >
                <TextEditor
                  onChange={async (value, _delta, _source, editor) => {
                    // @NOTE: we have to implemented this logic as TextEditor is not regular MUI input component.
                    // the idea is to run validation on pure text but set a stringified html value to data eventually
                    const text = editor.getText().replace(RegExp(/\n$/g), '');

                    try {
                      await setFieldValue('text', value, false);
                      await setFieldError('text', '');

                      await schema.validateAt('text', {
                        subject: values.subject,
                        text,
                      });
                    } catch (error) {
                      if (error instanceof Error) {
                        await setFieldError('text', error.message);
                      }
                    }
                  }}
                  readOnly={false}
                  modules={{
                    toolbar: getToolbarConfig({ excludeMedia: true }),
                  }}
                />
              </BorderBox>
            </Box>
            <FormHelperText error={Boolean(errors.text)} id="text-error-text">
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
          </Row>
        </Form>
      )}
    </Formik>
  );
}
