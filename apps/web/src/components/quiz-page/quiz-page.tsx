import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import {
  PageFragmentFragment as Props,
  PageProgressState,
} from '../../__generated__/graphql';
import { Box } from '../box/box';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import { ChangeEvent, useState } from 'react';
import Button from '@mui/material/Button';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { difference } from 'lodash';
import { CREATE_QUIZ_PAGE_PROGRESS } from '../../graphql/mutations/mutations';
import { GET_COURSE } from '../../graphql/queries/queries';
import { useError } from '../../../utils/hooks';

export default function QuizPage({ question, progress, _id: pageId }: Props) {
  const router = useRouter();
  const courseId = router.query.id as string;
  const [answers, setAnswers] = useState<string[]>(progress?.answers ?? []);
  const isSingleAnswerQuestion = question?.answers.length === 1;
  const [createProgress, { error }] = useMutation(CREATE_QUIZ_PAGE_PROGRESS, {
    refetchQueries: [
      {
        query: GET_COURSE,
        variables: { _id: courseId },
      },
    ],
  });

  useError([error?.message]);

  if (!question) {
    return null;
  }

  const handleSubmit = async () => {
    const expectedAnswerIds = question?.answers.map((answer) => answer._id);

    await createProgress({
      variables: {
        state: isAnsweredCorrectly(expectedAnswerIds, answers)
          ? PageProgressState.Pass
          : PageProgressState.Fail,
        page: pageId,
        course: courseId,
        answers: answers,
      },
    });
  };

  const isAnsweredCorrectly = (expected: string[], actual: string[]) =>
    !difference(expected, actual).length;

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
        gap: '2rem',
        flex: '1',
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontSize: '1.5rem' }}
        color={'warning.main'}
      >
        {question.content}
      </Typography>
      <Box>
        {isSingleAnswerQuestion ? (
          <RadioGroup sx={{ gap: '0.5rem' }}>
            {question.options.map((option, i) => (
              <FormControlLabel
                key={i}
                value={option._id}
                disabled={Boolean(progress?.answers?.length)}
                control={
                  <Radio
                    checked={Boolean(answers?.includes(option._id))}
                    onChange={handleChange}
                  />
                }
                label={option.content}
              />
            ))}
          </RadioGroup>
        ) : (
          <FormGroup sx={{ gap: '0.5rem' }}>
            {question.options.map((option, i) => (
              <FormControlLabel
                key={i}
                value={option._id}
                disabled={Boolean(progress?.answers?.length)}
                control={
                  <Checkbox
                    checked={Boolean(answers?.includes(option._id))}
                    onChange={handleChange}
                  />
                }
                label={option.content}
              />
            ))}
          </FormGroup>
        )}
      </Box>

      <Button
        variant="contained"
        disabled={Boolean(progress?.answers) || !courseId}
        onClick={handleSubmit}
        color="success"
      >
        Submit
      </Button>
    </Box>
  );
}
