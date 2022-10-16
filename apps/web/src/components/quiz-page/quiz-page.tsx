import { Box } from '@mui/material';
import { QuizPage as Props } from 'graphql-schema-gen/schema.gen';

export default function QuizPage(props: Props) {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h2>{props.title}</h2>
      <p>{props.description}</p>
      <Box>
        {props.questions.map((q, i) => (
          <div key={i}>{q.content}</div>
        ))}
      </Box>
    </Box>
  );
}
