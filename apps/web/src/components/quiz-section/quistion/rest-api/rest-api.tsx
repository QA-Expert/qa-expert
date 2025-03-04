import { ChangeEvent, useEffect, useState } from 'react';
import FormGroup from '@mui/material/FormGroup/FormGroup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button/Button';
import { Box } from '@/components/box/box';
import { MAX_TEXT_FIELD_LENGTH } from '../../constants';
import MenuItem from '@mui/material/MenuItem/MenuItem';
import { Row } from '@/components/row/row';
import { BorderBox } from '@/components/box/border-box';
import Tabs from '@mui/material/Tabs/Tabs';
import Tab from '@mui/material/Tab/Tab';
import { Tabpanel, a11yProps } from '@/components/tabpanel/tabpanel';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton/IconButton';
import Typography from '@mui/material/Typography/Typography';
import { TextEditor } from '@/components/text-editor/text-editor';
import { ReactQuillProps } from 'react-quill';
import { getFullUrl } from './handlers';
import { quizPageData, restApiQuestionResponse } from 'apollo/store';
import { useMutation } from '@apollo/client';
import { VALIDATE_REST_API } from 'graphql/mutations/mutations';
import { useError } from 'utils/hooks';

type Method = 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';
type KeyValue = { name: string; value: string };

export type RestApiRequestData = {
  method: Method;
  protocol: 'http' | 'https';
  host: string;
  params: KeyValue[];
  headers: KeyValue[];
  body?: string;
};

type Props = {
  onChange: (data: RestApiRequestData | undefined) => void;
  progressData: RestApiRequestData | undefined;
  expectedAnswerId: string | undefined;
};

const METHODS: Method[] = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
const PROTOCOLS: RestApiRequestData['protocol'][] = ['http', 'https'];

export function RestApiQuestion({
  onChange,
  expectedAnswerId,
  progressData,
}: Props) {
  const [validateRestApi, { error }] = useMutation(VALIDATE_REST_API);
  const [data, setData] = useState<RestApiRequestData>({
    method: 'GET',
    protocol: 'http',
    host: 'base-url-from-question-content.com',
    params: [],
    headers: [],
  });
  const [url, setUrl] = useState(`${data.protocol}://${data.host}`);
  const [tabIndex, setTabIndex] = useState(0);

  quizPageData(data);

  useError([error?.message]);

  /**
   * Set data local state variable from stored progress - in case user already submitted answer
   */
  useEffect(() => {
    if (progressData) {
      setUrl(getFullUrl(progressData));
      setData(progressData);
    }

    return () => {
      restApiQuestionResponse(undefined);
    };
  }, [progressData]);

  const hasBody =
    data.method === 'POST' || data.method === 'PUT' || data.method === 'PATCH';

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleChange =
    (fieldName: keyof Omit<RestApiRequestData, 'steps'>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const newData = { ...data };

      // @ts-expect-error MUI does not handle types very well in Select options
      newData[fieldName] = e.target.value;

      const newUrl = new window.URL(url);

      newUrl.protocol = newData.protocol;
      newUrl.host = newData.host;

      if (
        fieldName === 'method' &&
        (newData.method == 'GET' || newData.method == 'DELETE')
      ) {
        delete newData.body;
      }

      setUrl(newUrl.toString());
      setData(newData);
      onChange(newData);
    };

  const handleParamsChange =
    (fieldName: keyof RestApiRequestData['params'][number], index: number) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const newData = { ...data };
      const oldName = newData.params[index].name;
      const oldValue = newData.params[index].value;

      newData.params[index][fieldName] = e.target.value;

      const newUrl = new window.URL(url);

      if (fieldName === 'value') {
        newUrl.searchParams.set(oldName, e.target.value);
      }

      if (fieldName === 'name') {
        newUrl.searchParams.delete(oldName);
        newUrl.searchParams.append(e.target.value, oldValue);
      }

      setUrl(newUrl.toString());
      setData(newData);
      onChange(newData);
    };

  const handleHeadersChange =
    (fieldName: keyof RestApiRequestData['headers'][number], index: number) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const newData = { ...data };

      newData.headers[index][fieldName] = e.target.value;

      setData(newData);
      onChange(newData);
    };

  const handleAddItem = (fieldName: 'params' | 'headers') => () => {
    const newData = { ...data };
    const paramName = `${fieldName}${newData[fieldName].length + 1}`;

    newData[fieldName].push({
      name: paramName,
      value: '',
    });

    if (fieldName === 'params') {
      const newUrl = new window.URL(url);

      newUrl.searchParams.append(paramName, '');

      setUrl(newUrl.toString());
    }

    setData(newData);
    onChange(newData);
  };

  const handleRemoveItem =
    (fieldName: 'params' | 'headers', index: number) => () => {
      const newData = { ...data };

      if (fieldName === 'params') {
        const param = newData[fieldName][index];
        const newUrl = new window.URL(url);

        newUrl.searchParams.delete(param.name);

        setUrl(newUrl.toString());
      }

      newData[fieldName].splice(index, 1);

      setData(newData);
      onChange(newData);
    };

  /**
   *
   * @description This handler gets args from Editor onChange callback
   * Then it gets only content text value instead of whole content which is stringified HTML.
   * Then we store that text into data.body stripping last line break char
   */
  const handleChangeBody: ReactQuillProps['onChange'] = (...args) => {
    const [, , , editor] = args;
    const newData = { ...data };

    newData.body = editor.getText().replace(RegExp(/\n$/g), '');

    setData(newData);
    onChange(newData);
  };

  const handleSubmitTestRequest = async () => {
    if (!expectedAnswerId || !data) {
      return;
    }

    const response = await validateRestApi({
      variables: {
        stringifiedRequestData: JSON.stringify(data),
        expectedAnswerId,
      },
    });

    restApiQuestionResponse(response.data?.validateRestApi);
  };

  return (
    <Box sx={{ gap: '1rem', width: '100%' }}>
      <FormGroup sx={{ gap: '1rem', width: '100%' }}>
        <Row>
          <TextField
            size="small"
            variant="outlined"
            id="rest-api-method"
            name="rest-api-method"
            select
            label="Method"
            value={data.method}
            onChange={handleChange('method')}
          >
            {METHODS.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            size="small"
            variant="outlined"
            id="rest-api-protocol"
            name="rest-api-protocol"
            select
            label="Protocol"
            value={data.protocol}
            onChange={handleChange('protocol')}
          >
            {PROTOCOLS.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Host"
            size="small"
            multiline
            autoComplete="on"
            maxRows={3}
            type="text"
            name="rest-api-host"
            id="rest-api-host"
            placeholder="Enter Host ..."
            onChange={handleChange('host')}
            value={data.host}
            variant="outlined"
            inputProps={{ maxLength: MAX_TEXT_FIELD_LENGTH }}
            sx={{ flex: 1 }}
          />
        </Row>

        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs"
        >
          <Tab label="Params" {...a11yProps(0)} />
          <Tab label="Headers" {...a11yProps(1)} />
        </Tabs>

        <Tabpanel index={0} value={tabIndex}>
          <BorderBox>
            {data.params.length === 0 ? (
              <Typography>No Params</Typography>
            ) : null}

            {data.params.map((param, index) => (
              <FormGroup
                key={index}
                sx={{ gap: '1rem', width: '100%', flexDirection: 'row' }}
              >
                <TextField
                  sx={{ flex: 1 }}
                  label={`Param Name ${index + 1}`}
                  size="small"
                  multiline
                  autoComplete="on"
                  maxRows={3}
                  type="text"
                  name={`rest-api-param-name-${index + 1}`}
                  id={`rest-api-param-name-${index + 1}`}
                  placeholder="Enter Param Name ..."
                  onChange={handleParamsChange('name', index)}
                  value={param.name}
                  variant="outlined"
                  inputProps={{ maxLength: MAX_TEXT_FIELD_LENGTH }}
                />

                <TextField
                  sx={{ flex: 1 }}
                  label={`Param Value ${index + 1}`}
                  size="small"
                  multiline
                  autoComplete="on"
                  maxRows={3}
                  type="text"
                  name={`rest-api-param-value-${index + 1}`}
                  id={`rest-api-param-value-${index + 1}`}
                  placeholder="Enter Param Value ..."
                  onChange={handleParamsChange('value', index)}
                  value={param.value}
                  variant="outlined"
                  inputProps={{ maxLength: MAX_TEXT_FIELD_LENGTH }}
                />
                <IconButton
                  aria-label="Remove Param"
                  onClick={handleRemoveItem('params', index)}
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
            onClick={handleAddItem('params')}
            size="small"
          >
            Add Param
          </Button>
        </Tabpanel>

        <Tabpanel index={1} value={tabIndex}>
          <BorderBox>
            {data.headers.length === 0 ? (
              <Typography>No Headers</Typography>
            ) : null}

            {data.headers.map((header, index) => (
              <FormGroup
                key={index}
                sx={{ gap: '1rem', width: '100%', flexDirection: 'row' }}
              >
                <TextField
                  sx={{ flex: 1 }}
                  label={`Header Name ${index + 1}`}
                  size="small"
                  multiline
                  autoComplete="on"
                  maxRows={3}
                  type="text"
                  name={`rest-api-header-name-${index + 1}`}
                  id={`rest-api-header-name-${index + 1}`}
                  placeholder="Enter Header Name ..."
                  onChange={handleHeadersChange('name', index)}
                  value={header.name}
                  variant="outlined"
                  inputProps={{ maxLength: MAX_TEXT_FIELD_LENGTH }}
                />

                <TextField
                  sx={{ flex: 1 }}
                  label={`Header Value ${index + 1}`}
                  size="small"
                  multiline
                  autoComplete="on"
                  maxRows={3}
                  type="text"
                  name={`rest-api-header-value-${index + 1}`}
                  id={`rest-api-header-value-${index + 1}`}
                  placeholder="Enter Header Value ..."
                  onChange={handleHeadersChange('value', index)}
                  value={header.value}
                  variant="outlined"
                  inputProps={{ maxLength: MAX_TEXT_FIELD_LENGTH }}
                />

                <IconButton
                  aria-label="Remove Header"
                  onClick={handleRemoveItem('headers', index)}
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
            onClick={handleAddItem('headers')}
            size="small"
          >
            Add Header
          </Button>
        </Tabpanel>

        {hasBody ? (
          <Box>
            <Typography variant="h6" sx={{ color: 'secondary.main' }}>
              Body
            </Typography>
            <BorderBox
              sx={{ minHeight: '160px', borderColor: 'secondary.main' }}
            >
              <TextEditor
                //We want to start Editor with code formatting by default
                initialValue={data.body ?? 'body data'}
                onChange={handleChangeBody}
                readOnly={false}
                modules={{
                  toolbar: {
                    container: [['code-block']],
                  },
                }}
              />
            </BorderBox>
          </Box>
        ) : null}
      </FormGroup>

      <Button onClick={handleSubmitTestRequest} variant="outlined">
        Submit Test Request
      </Button>
    </Box>
  );
}
