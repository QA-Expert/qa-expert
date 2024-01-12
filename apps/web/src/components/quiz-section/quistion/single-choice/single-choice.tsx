import FormControlLabel from '@mui/material/FormControlLabel/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup/RadioGroup';
import Radio from '@mui/material/Radio/Radio';
import { QuestionProps } from '@/components/quiz-section/quiz-section';

export function SingleChoiceQuestion({ onChange, question }: QuestionProps) {
  if (!question) {
    return null;
  }

  const answerIds = question.answers?.map((answer) => answer._id);

  return (
    <RadioGroup sx={{ gap: '0.5rem' }}>
      {question.options.map((option, i) => (
        <FormControlLabel
          key={i}
          value={option._id}
          control={
            <Radio
              checked={Boolean(answerIds.includes(option._id))}
              onChange={onChange}
            />
          }
          label={option.content}
        />
      ))}
    </RadioGroup>
  );
}
