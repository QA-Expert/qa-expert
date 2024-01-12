import { QuestionProps } from '@/components/quiz-section/quiz-section';
import { ChangeEvent, useState } from 'react';
import FormGroup from '@mui/material/FormGroup/FormGroup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button/Button';
import { Box } from '@/components/box/box';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { GET_USER } from 'graphql/queries/queries';
import { useError } from 'utils/hooks';
import { getUsername } from 'utils/utils';
import MenuItem from '@mui/material/MenuItem/MenuItem';

type Status = 'open' | 'fixed' | 'cannot reproduce' | 'not a bug';

type Severity = 'low' | 'medium' | 'high' | 'critical';

export type BugReportData = {
  id: string;
  status: Status;
  severity: Severity;
  author: string;
  title: string;
  steps: string[];
  actualResult: string;
  expectedResult: string;
};

const STATUSES: Status[] = ['open', 'fixed', 'cannot reproduce', 'not a bug'];

const SEVERITY: Severity[] = ['low', 'medium', 'high', 'critical'];

export function BugReportQuestion({
  onChange,
  question,
}: Omit<QuestionProps, 'onChange'> & {
  onChange: (data: BugReportData) => void;
}) {
  const { data: userData, error: userError } = useSuspenseQuery(GET_USER);
  const [data, setData] = useState<BugReportData>({
    id: Date.now().toString(),
    author: getUsername(userData.user),
    status: 'open',
    severity: 'low',
    title: '',
    steps: [''],
    actualResult: '',
    expectedResult: '',
  });

  useError([userError?.message]);

  if (!question) {
    return null;
  }

  const handleChange =
    (fieldName: keyof Omit<BugReportData, 'steps'>) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newData = { ...data };

      // @ts-expect-error MUI does not handle types very well in Select options
      newData[fieldName] = e.target.value;

      setData(newData);

      onChange(newData);
    };

  const handleStepChange =
    (index: number) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newData = { ...data };

      newData.steps[index] = e.target.value;

      setData(newData);

      onChange(newData);
    };

  const handleAddStep = () => {
    const newData = { ...data };

    newData.steps.push('');

    setData(newData);
  };

  return (
    <Box sx={{ gap: '1rem', width: '100%' }}>
      <FormGroup sx={{ gap: '1rem', width: '100%' }}>
        <TextField
          disabled
          label="ID"
          size="small"
          type="text"
          name="bug-report-id"
          id="bug-report-id"
          value={data.id}
          variant="outlined"
        />
        <TextField
          disabled
          label="Author"
          size="small"
          type="text"
          name="bug-report-author"
          id="bug-report-author"
          value={data.author}
          variant="outlined"
        />

        <TextField
          size="small"
          variant="outlined"
          id="bug-report-status"
          name="bug-report-status"
          select
          label="Status"
          defaultValue={STATUSES[0]}
          onChange={handleChange('status')}
        >
          {STATUSES.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          size="small"
          variant="outlined"
          id="bug-report-severity"
          name="bug-report-severity"
          select
          label="Severity"
          defaultValue={SEVERITY[0]}
          onChange={handleChange('severity')}
        >
          {SEVERITY.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Title"
          size="small"
          multiline
          autoComplete="on"
          maxRows={3}
          type="text"
          name="bug-report-title"
          id="bug-report-title"
          placeholder="Enter Title ..."
          onChange={handleChange('title')}
          value={data.title}
          variant="outlined"
        />

        <Box
          sx={{
            gap: '1rem',
            width: '100%',
            border: '1px solid',
            borderColor: 'secondary.dark',
            borderRadius: '8px',
            padding: '1rem',
          }}
        >
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
                name={`bug-report-step-${index + 1}`}
                id={`bug-report-step-${index + 1}`}
                placeholder="Enter Step ..."
                onChange={handleStepChange(index)}
                value={step}
                variant="outlined"
              />
            </FormGroup>
          ))}
        </Box>

        <Button
          sx={{ alignSelf: 'flex-start' }}
          variant="outlined"
          color="secondary"
          onClick={handleAddStep}
        >
          Add Step
        </Button>

        <TextField
          label="Actual Result"
          size="small"
          multiline
          autoComplete="on"
          maxRows={3}
          type="text"
          name="bug-report-actual-result"
          id="bug-report-actual-result"
          placeholder="Enter Actual Result ..."
          onChange={handleChange('actualResult')}
          value={data.actualResult}
          variant="outlined"
        />

        <TextField
          label="Expected Result"
          size="small"
          multiline
          autoComplete="on"
          maxRows={3}
          type="text"
          name="bug-report-expected-result"
          id="bug-report-expected-result"
          placeholder="Enter Expected Result ..."
          onChange={handleChange('expectedResult')}
          value={data.expectedResult}
          variant="outlined"
        />
      </FormGroup>

      <Button
        sx={{ alignSelf: 'flex-end' }}
        variant="contained"
        component="label"
        disabled
      >
        Upload File
      </Button>
    </Box>
  );
}
