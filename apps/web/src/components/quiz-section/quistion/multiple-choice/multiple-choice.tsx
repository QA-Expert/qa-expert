import FormControlLabel from '@mui/material/FormControlLabel/FormControlLabel';
import { QuestionProps } from '@/components/quiz-section/quiz-section';
import FormGroup from '@mui/material/FormGroup/FormGroup';
import Checkbox from '@mui/material/Checkbox/Checkbox';

export function MultipleChoiceQuestion({
  onChange,
  options,
  actualAnswers,
  disabled,
}: QuestionProps) {
  return (
    <FormGroup sx={{ gap: '0.5rem' }}>
      {options.map((option, i) => (
        <FormControlLabel
          key={i}
          value={option._id}
          control={
            <Checkbox
              disabled={disabled}
              checked={Boolean(actualAnswers?.includes(option._id))}
              onChange={onChange}
            />
          }
          label={option.content}
        />
      ))}
    </FormGroup>
  );
}
