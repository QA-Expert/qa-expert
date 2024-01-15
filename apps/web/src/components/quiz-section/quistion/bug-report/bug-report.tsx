import { ChangeEvent, useEffect, useState } from 'react';
import FormGroup from '@mui/material/FormGroup/FormGroup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button/Button';
import { Box } from '@/components/box/box';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { GET_USER } from 'graphql/queries/queries';
import { useError } from 'utils/hooks';
import { getUsername } from 'utils/utils';
import MenuItem from '@mui/material/MenuItem/MenuItem';
import Tooltip from '@mui/material/Tooltip/Tooltip';
import AttachmentIcon from '@mui/icons-material/Attachment';
import { MAX_TEXT_FIELD_LENGTH } from '../../constants';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton/IconButton';
import Typography from '@mui/material/Typography/Typography';
import { BorderBox } from '../components/border-box';

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
  progressData,
}: {
  onChange: (data: BugReportData) => void;
  progressData: BugReportData;
}) {
  const { data: userData, error: userError } = useSuspenseQuery(GET_USER);
  const [data, setData] = useState<BugReportData>({
    id: Date.now().toString(),
    author: getUsername(userData.user),
    status: 'open',
    severity: 'low',
    title: '',
    steps: [],
    actualResult: '',
    expectedResult: '',
  });

  useEffect(() => {
    if (progressData?.steps) {
      setData(progressData);
    }
  }, [progressData]);

  useError([userError?.message]);

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
        <Tooltip title="This field is autogenerated" arrow>
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
        </Tooltip>

        <Tooltip title="This field is autogenerated" arrow>
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
        </Tooltip>

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
                name={`bug-report-step-${index + 1}`}
                id={`bug-report-step-${index + 1}`}
                placeholder="Enter Step ..."
                onChange={handleStepChange(index)}
                value={step}
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
          size="small"
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
          inputProps={{ maxLength: MAX_TEXT_FIELD_LENGTH }}
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
          inputProps={{ maxLength: MAX_TEXT_FIELD_LENGTH }}
        />
      </FormGroup>

      <Box sx={{ alignSelf: 'flex-end' }}>
        <Tooltip
          title="We don't validate upload - button is for education purpose"
          arrow
        >
          {/* hack to make Tooltip work on disabled button @url https://mui.com/material-ui/react-tooltip/#disabled-elements*/}
          <span>
            <Button
              sx={{ gap: '0.5rem' }}
              variant="contained"
              component="label"
              disabled
            >
              <AttachmentIcon />
              Add an attachment
            </Button>
          </span>
        </Tooltip>
      </Box>
    </Box>
  );
}
