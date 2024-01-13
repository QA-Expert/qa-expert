import { QuestionProps } from '@/components/quiz-section/quiz-section';
import { ChangeEvent, useState } from 'react';
import FormGroup from '@mui/material/FormGroup/FormGroup';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Button from '@mui/material/Button/Button';
import { Box } from '@/components/box/box';
import { MAX_TEXT_FIELD_LENGTH } from '../../constants';

type ChecklistItemProps = Pick<TextFieldProps, 'name' | 'value' | 'error'>;

export function ChecklistQuestion({
  onChange,
  question,
}: Omit<QuestionProps, 'onChange'> & { onChange: (data: string[]) => void }) {
  const [checklist, setChecklist] = useState<ChecklistItemProps[]>([
    {
      name: 'item-1',
      value: '',
    },
  ]);

  if (!question) {
    return null;
  }

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
    <Box sx={{ gap: '1rem', width: '100%' }}>
      <FormGroup sx={{ gap: '1rem', width: '100%' }}>
        {checklist.map((item, i) => (
          <TextField
            key={i}
            label={`Item ${i + 1}`}
            size="small"
            multiline
            autoComplete="on"
            maxRows={3}
            type="text"
            name={item.name}
            id={item.name}
            placeholder="Enter your item title ..."
            onChange={handleChange(i)}
            value={item.value}
            variant="outlined"
            inputProps={{ maxLength: MAX_TEXT_FIELD_LENGTH }}
          />
        ))}
      </FormGroup>

      <Button
        sx={{ alignSelf: 'flex-start' }}
        variant="outlined"
        color="secondary"
        onClick={handleAddItem}
        size="small"
      >
        Add Item
      </Button>
    </Box>
  );
}
