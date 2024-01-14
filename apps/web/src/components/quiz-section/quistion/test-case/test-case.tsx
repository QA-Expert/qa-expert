import { ChangeEvent, useEffect, useState } from 'react';
import FormGroup from '@mui/material/FormGroup/FormGroup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button/Button';
import { Box } from '@/components/box/box';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { GET_USER } from 'graphql/queries/queries';
import { useError } from 'utils/hooks';
import { getUsername } from 'utils/utils';
import { MAX_TEXT_FIELD_LENGTH } from '../../constants';
import { BorderBox } from '../components/border-box';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton/IconButton';
import Typography from '@mui/material/Typography/Typography';

export type TestCaseData = {
  id: string;
  author: string;
  title: string;
  preCondition: string;
  steps: {
    step: string;
    data: string;
  }[];
  postCondition: string;
  expectedResult: string;
};

export function TestCaseQuestion({
  onChange,
  progressData,
}: {
  onChange: (data: TestCaseData) => void;
  progressData?: TestCaseData;
}) {
  const { data: userData, error: userError } = useSuspenseQuery(GET_USER);
  const [data, setData] = useState<TestCaseData>({
    id: Date.now().toString(),
    author: getUsername(userData.user),
    title: '',
    preCondition: '',
    steps: [],
    postCondition: '',
    expectedResult: '',
  });

  useEffect(() => {
    if (progressData) {
      setData(progressData);
    }
  }, [progressData]);

  useError([userError?.message]);

  const handleChange =
    (fieldName: keyof Omit<TestCaseData, 'steps'>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const newData = { ...data };

      newData[fieldName] = e.target.value;

      setData(newData);
      onChange(newData);
    };

  const handleStepChange =
    (fieldName: keyof TestCaseData['steps'][number], index: number) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const newData = { ...data };

      newData.steps[index][fieldName] = e.target.value;

      setData(newData);
      onChange(newData);
    };

  const handleAddStep = () => {
    const newData = { ...data };

    newData.steps.push({
      step: '',
      data: '',
    });

    setData(newData);
    onChange(newData);
  };

  const handleRemoveStep = (index: number) => () => {
    const newData = { ...data };

    newData.steps.splice(index, 1);

    setData(newData);
    onChange(newData);
  };

  return (
    <Box sx={{ gap: '1rem', width: '100%' }}>
      <FormGroup sx={{ gap: '1rem', width: '100%' }}>
        <TextField
          disabled
          label="ID"
          size="small"
          type="text"
          name="test-case-id"
          id="test-case-id"
          value={data.id}
          variant="outlined"
        />
        <TextField
          disabled
          label="Author"
          size="small"
          type="text"
          name="test-case-author"
          id="test-case-author"
          value={data.author}
          variant="outlined"
        />

        <TextField
          label="Title"
          size="small"
          multiline
          autoComplete="on"
          maxRows={3}
          type="text"
          name="test-case-title"
          id="test-case-title"
          placeholder="Enter Title ..."
          onChange={handleChange('title')}
          value={data.title}
          variant="outlined"
          inputProps={{ maxLength: MAX_TEXT_FIELD_LENGTH }}
        />

        <TextField
          label="Pre-Condition"
          size="small"
          multiline
          autoComplete="on"
          maxRows={3}
          type="text"
          name="test-case-pre-condition"
          id="test-case-pre-condition"
          placeholder="Enter Pre-Condition ..."
          onChange={handleChange('preCondition')}
          value={data.preCondition}
          variant="outlined"
          inputProps={{ maxLength: MAX_TEXT_FIELD_LENGTH }}
        />

        <BorderBox>
          {data.steps.length === 0 ? (
            <Typography>Please Add Steps</Typography>
          ) : null}

          {data.steps.map((step, index) => (
            <FormGroup
              key={index}
              sx={{ gap: '1rem', width: '100%', flexDirection: 'row' }}
            >
              <TextField
                sx={{ flex: 1 }}
                label={`Step ${index + 1}`}
                size="small"
                multiline
                autoComplete="on"
                maxRows={3}
                type="text"
                name={`test-case-step-${index + 1}`}
                id={`test-case-step-${index + 1}`}
                placeholder="Enter Step ..."
                onChange={handleStepChange('step', index)}
                value={step.step}
                variant="outlined"
                inputProps={{ maxLength: MAX_TEXT_FIELD_LENGTH }}
              />

              <TextField
                sx={{ flex: 1 }}
                label={`Step Data ${index + 1}`}
                size="small"
                multiline
                autoComplete="on"
                maxRows={3}
                type="text"
                name={`test-case-data-${index + 1}`}
                id={`test-case-data-${index + 1}`}
                placeholder="Enter Data ..."
                onChange={handleStepChange('data', index)}
                value={step.data}
                variant="outlined"
                inputProps={{ maxLength: MAX_TEXT_FIELD_LENGTH }}
              />

              <IconButton
                aria-label="Remove Step"
                onClick={handleRemoveStep(index)}
              >
                <ClearIcon />
              </IconButton>
            </FormGroup>
          ))}
        </BorderBox>

        <Button
          sx={{ alignSelf: 'flex-start' }}
          variant="outlined"
          color="secondary"
          onClick={handleAddStep}
          size="small"
        >
          Add Step
        </Button>

        <TextField
          label="Post-Condition"
          size="small"
          multiline
          autoComplete="on"
          maxRows={3}
          type="text"
          name="test-case-post-condition"
          id="test-case-post-condition"
          placeholder="Enter Post-Condition ..."
          onChange={handleChange('postCondition')}
          value={data.postCondition}
          variant="outlined"
          inputProps={{ maxLength: MAX_TEXT_FIELD_LENGTH }}
        />

        <TextField
          label="Expected Result"
          size="small"
          multiline
          autoComplete="on"
          maxRows={3}
          type="text"
          name="test-case-expected-result"
          id="test-case-expected-result"
          placeholder="Enter Expected Result ..."
          onChange={handleChange('expectedResult')}
          value={data.expectedResult}
          variant="outlined"
          inputProps={{ maxLength: MAX_TEXT_FIELD_LENGTH }}
        />
      </FormGroup>
    </Box>
  );
}
