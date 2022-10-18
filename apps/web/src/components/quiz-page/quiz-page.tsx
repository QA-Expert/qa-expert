import Typography from '@mui/material/Typography';
import { QuizPage as Props } from 'graphql-schema-gen/schema.gen';
import { Box } from '../box/box';

export default function QuizPage(props: Props) {
  return (
    <Box
      sx={{
        width: '100%',
        justifyContent: 'start',
        height: '100%',
        padding: '1rem',
        gap: '0.75rem',
      }}
    >
      <Typography variant="h3" sx={{ fontSize: '1.5rem' }}>
        {props.title}
      </Typography>
      <Typography>{props.description}</Typography>
      <Box sx={{ flex: 1 }}>
        {props.questions.map((q, i) => (
          <Typography key={i}>{q.content}</Typography>
        ))}
      </Box>
    </Box>
  );
}
