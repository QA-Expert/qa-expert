import { Props as QuizPageProps } from '@/components/quiz-section/quiz-section';
import { ChangeEvent, useState } from 'react';
import FormGroup from '@mui/material/FormGroup/FormGroup';
import InputLabel from '@mui/material/InputLabel/InputLabel';
import FormHelperText from '@mui/material/FormHelperText/FormHelperText';
import Input, { InputProps } from '@mui/material/Input/Input';
import FormControl from '@mui/material/FormControl/FormControl';
import Button from '@mui/material/Button/Button';

type Props = {
  onChange: (data: string[]) => void;
  question: QuizPageProps['question'];
  progress: QuizPageProps['progress'];
};

type ChecklistItemProps = Pick<InputProps, 'name' | 'value' | 'error'>;

export function ChecklistQuestion({ onChange, question, progress }: Props) {
  const [checklist, setChecklist] = useState<ChecklistItemProps[]>([
    {
      name: 'item-1',
      value: '',
    },
  ]);

  if (!question) {
    return null;
  }

  const answerIds = question.answers?.map((answer) => answer._id);

  const handleChange =
    (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
      const newChecklist = [...checklist];

      newChecklist[index].value = e.target.value;

      setChecklist(newChecklist);

      const data = newChecklist
        .map((item) => item.value)
        .filter<string>((item): item is string => Boolean(item));

      onChange(data);
    };
  const handleAddItem = () => {
    setChecklist([
      ...checklist,
      {
        name: `item-${checklist.length + 1}`,
        value: '',
      },
    ]);
  };

  return (
    <FormGroup sx={{ gap: '0.5rem' }}>
      {checklist.map((item, i) => (
        <FormControl key={item.name}>
          <InputLabel htmlFor={item.name}>Item</InputLabel>
          <Input
            autoComplete="on"
            type="text"
            name={item.name}
            id={item.name}
            placeholder="Enter your item title ..."
            onChange={handleChange(i)}
            value={item.value}
            error={Boolean(item.error)}
          />
          <FormHelperText
            error={Boolean(item.error)}
            id={`${item.name}-error-text`}
          >
            {item.error}
          </FormHelperText>
        </FormControl>
      ))}

      <Button variant="contained" color="success" onClick={handleAddItem}>
        Add Item
      </Button>
    </FormGroup>
  );
}
