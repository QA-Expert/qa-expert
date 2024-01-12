import FormControlLabel from '@mui/material/FormControlLabel/FormControlLabel';
import { QuestionProps } from '@/components/quiz-section/quiz-section';
import FormGroup from '@mui/material/FormGroup/FormGroup';
import Checkbox from '@mui/material/Checkbox/Checkbox';

export function MultipleChoiceQuestion({ onChange, question }: QuestionProps) {
  if (!question) {
    return null;
  }

  const answerIds = question.answers?.map((answer) => answer._id);

  return (
    <FormGroup sx={{ gap: '0.5rem' }}>
      {question.options.map((option, i) => (
        <FormControlLabel
          key={i}
          value={option._id}
          control={
            <Checkbox
              checked={Boolean(answerIds?.includes(option._id))}
              onChange={onChange}
            />
          }
          label={option.content}
        />
      ))}
    </FormGroup>
  );
}
