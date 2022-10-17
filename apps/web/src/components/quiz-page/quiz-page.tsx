import { QuizPage as Props } from 'graphql-schema-gen/schema.gen';
import { Box } from '../box/box';

export default function QuizPage(props: Props) {
  return (
    <Box
      sx={{
        width: '100%',
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
