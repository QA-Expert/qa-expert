import FormControlLabel from '@mui/material/FormControlLabel/FormControlLabel';
import { Props as QuizPageProps } from '@/components/quiz-section/quiz-section';
import { ChangeEvent } from 'react';
import RadioGroup from '@mui/material/RadioGroup/RadioGroup';
import Radio from '@mui/material/Radio/Radio';

type Props = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  question: QuizPageProps['question'];
  progress: QuizPageProps['progress'];
};

export function SingleChoiceQuestion({ onChange, question, progress }: Props) {
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
          disabled={Boolean(progress?.answers?.length)}
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
