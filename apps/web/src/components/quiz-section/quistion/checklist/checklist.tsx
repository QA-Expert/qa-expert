import { ChangeEvent, useEffect, useState } from 'react';
import FormGroup from '@mui/material/FormGroup/FormGroup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button/Button';
import { Box } from '@/components/box/box';
import { MAX_TEXT_FIELD_LENGTH } from '../../constants';
import { Row } from '@/components/row/row';
import IconButton from '@mui/material/IconButton/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import Typography from '@mui/material/Typography/Typography';
import { BorderBox } from '../components/border-box';

export type ChecklistData = string[];

export function ChecklistQuestion({
  onChange,
  progressData,
}: {
  onChange: (data: ChecklistData | undefined) => void;
  progressData: ChecklistData;
}) {
  const [data, setData] = useState<ChecklistData>([]);

  useEffect(() => {
    if (progressData?.length) {
      setData(progressData);
    }
  }, [progressData]);

  const handleChange =
    (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
      const newData = [...data];

      newData[index] = e.target.value;

      setData(newData);

      const filteredData = newData.filter((item) => Boolean(item));

      onChange(filteredData);
    };

  const handleAddItem = () => {
    setData([...data, '']);
  };

  const handleRemoveItem = (index: number) => () => {
    const newData = [...data];

    newData.splice(index, 1);

    setData(newData);
    onChange(newData);
  };

  return (
    <Box sx={{ gap: '1rem', width: '100%' }}>
      <BorderBox>
        <FormGroup sx={{ gap: '1rem', width: '100%' }}>
          {data.length === 0 ? (
            <Typography>Please Add Checklist Item</Typography>
          ) : null}

          {data.map((item, i) => (
            <Row key={i}>
              <TextField
                fullWidth
                label={`Item ${i + 1}`}
                size="small"
                multiline
                autoComplete="on"
                maxRows={3}
                type="text"
                name={`item-${i + 1}`}
                id={`item-${i + 1}`}
                placeholder="Enter your item title ..."
                onChange={handleChange(i)}
                value={item}
                variant="outlined"
                inputProps={{ maxLength: MAX_TEXT_FIELD_LENGTH }}
              />
              <IconButton
                aria-label="Remove Item"
                onClick={handleRemoveItem(i)}
              >
                <ClearIcon />
              </IconButton>
            </Row>
          ))}
        </FormGroup>
      </BorderBox>

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
