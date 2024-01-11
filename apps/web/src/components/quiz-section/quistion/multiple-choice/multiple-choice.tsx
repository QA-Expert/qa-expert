import FormControlLabel from '@mui/material/FormControlLabel/FormControlLabel';
import { Props as QuizPageProps } from '@/components/quiz-section/quiz-section';
import { ChangeEvent } from 'react';
import FormGroup from '@mui/material/FormGroup/FormGroup';
import Checkbox from '@mui/material/Checkbox/Checkbox';

type Props = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  question: QuizPageProps['question'];
  progress: QuizPageProps['progress'];
};

export function MultipleChoiceQuestion({
  onChange,
  question,
  progress,
}: Props) {
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
          disabled={Boolean(progress?.answers?.length)}
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
