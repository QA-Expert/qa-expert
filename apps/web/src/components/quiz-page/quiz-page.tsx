import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import { QuizPage as Props } from 'graphql-schema-gen/schema.gen';
import { Box } from '../box/box';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import { ChangeEvent, useState } from 'react';
import Button from '@mui/material/Button';
import { useMutation } from '@apollo/client';
import { CREATE_QUIZ_PROGRESS } from '../../graphql/mutations/mutations';
import { useRouter } from 'next/router';

export default function QuizPage(props: Props) {
  const router = useRouter();
  const slug = router.query.slug ? router.query.slug[0] : null;
  const [answers, setAnswers] = useState<string[]>([]);
  const isSingleAnswerQuestion = props.question.answers.length === 1;
  const [createQuizProgress] = useMutation(CREATE_QUIZ_PROGRESS);
  const handleSubmit = async () => {
    await createQuizProgress({
      variables: {
        state: 'VISITED',
        quizId: slug,
        quizPageId: props.id,
        answerIds: answers,
      },
    });
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isSingleAnswerQuestion) {
      setAnswers([e.target.value]);
    } else {
      let newAnswers = answers.map((a) => a);

      if (e.target.checked) {
        newAnswers.push(e.target.value);
      } else {
        newAnswers = newAnswers.filter((answer) => answer !== e.target.value);
      }

      setAnswers(newAnswers);
    }
  };

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
      <Box sx={{ flex: 1, gap: '1rem' }}>
        <Typography variant="h4" sx={{ fontSize: '1.5rem' }}>
          {props.question.content}
        </Typography>
        <Box>
          <FormGroup>
            {isSingleAnswerQuestion ? (
              <RadioGroup>
                {props.question.options.map((option, i) => (
                  <FormControlLabel
                    key={i}
                    value={option.id}
                    control={<Radio onChange={handleChange} />}
                    label={option.content}
                  />
                ))}
              </RadioGroup>
            ) : (
              props.question.options.map((option, i) => (
                <FormControlLabel
                  key={i}
                  value={option.id}
                  control={<Checkbox onChange={handleChange} />}
                  label={option.content}
                />
              ))
            )}
          </FormGroup>
        </Box>

        {/* TODO: Just for testing - remove */}
        <Box>
          <Typography fontWeight="bold">Correct answers:</Typography>
          {props.question.answers.map((a, i) => (
            <span key={i}>{a.content}</span>
          ))}
          <Typography fontWeight="bold">Users answers:</Typography>
          {answers.map((a, i) => (
            <span key={i}>{a}</span>
          ))}
        </Box>
      </Box>
      <Button onClick={handleSubmit}>Submit</Button>
    </Box>
  );
}
