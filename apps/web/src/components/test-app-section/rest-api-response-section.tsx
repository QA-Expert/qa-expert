import { Section } from '@/components/section/section';
import Divider from '@mui/material/Divider/Divider';
import Typography from '@mui/material/Typography/Typography';
import { Box } from '@/components/box/box';
import { Row as RowComponent } from '@/components/row/row';
import { getFullUrl } from '@/components/quiz-section/quistion/rest-api/handlers';
import { useReactiveVar } from '@apollo/client';
import { quizPageData, restApiQuestionResponse } from 'apollo/store';
import { RestApiRequestData } from '@/components/quiz-section/quistion/rest-api/rest-api';
import { styled } from '@mui/material/styles';

export function RestApiResponseSection() {
  const request = useReactiveVar(quizPageData) as
    | RestApiRequestData
    | undefined;
  const response = useReactiveVar(restApiQuestionResponse);

  return (
    <Section sx={{ flex: 0.75, padding: '3rem', gap: '1rem' }}>
      <Header variant="h3">Request</Header>

      <Box sx={{ width: '100%' }}>
        <Row>
          <PropName>URL:</PropName>
          <Typography>{request ? getFullUrl(request) : ''}</Typography>
        </Row>
        <Row>
          <PropName>Method:</PropName>
          <Typography>{request?.method ?? ''}</Typography>
        </Row>
        <Row>
          <PropName>Headers:</PropName>

          <Box>
            {request?.headers.map((header) => (
              <Row key={header.name}>
                <Typography>{header.name}: </Typography>
                <Typography>{header.value}</Typography>
              </Row>
            ))}
          </Box>
        </Row>
        <Row>
          <PropName>Body:</PropName>
          <Typography>{request?.body}</Typography>
        </Row>
      </Box>

      <Divider variant="fullWidth" flexItem color="warning" />

      <Header variant="h3">Response</Header>

      {!response ? (
        <Typography>
          Submit test or final request to see the Response
        </Typography>
      ) : (
        <Box sx={{ width: '100%' }}>
          <Row>
            <PropName>Status:</PropName>
            <Typography>{response.status ?? ''}</Typography>
          </Row>
          <Row>
            <PropName>Headers:</PropName>

            <Box>
              {response.headers.map((header) => (
                <Row key={header.name}>
                  <Typography>{header.name}: </Typography>
                  <Typography>{header.value}</Typography>
                </Row>
              ))}
            </Box>
          </Row>
          <Row>
            <PropName>Body:</PropName>
            <Typography>{response.body}</Typography>
          </Row>
        </Box>
      )}
    </Section>
  );
}

const Header = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  color: theme.palette.warning.main,
}));

const PropName = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.secondary.main,
}));

const Row = styled(RowComponent)(() => ({
  alignItems: 'baseline',
}));
