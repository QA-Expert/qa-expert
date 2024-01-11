'use client';

import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import {
  GetCourseQuery,
  PageProgressState,
  QuestionType,
} from '__generated__/graphql';
import { Box } from '@/components/box/box';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import { ChangeEvent, useState } from 'react';
import Button from '@mui/material/Button';
import { useMutation } from '@apollo/client';
import { useParams } from 'next/navigation';
import { difference } from 'lodash';
import { CREATE_QUIZ_PAGE_PROGRESS } from 'graphql/mutations/mutations';
import { GET_COURSE } from 'graphql/queries/queries';
import { useError } from 'utils/hooks';
import { SingleChoiceQuestion } from './quistion/single-choice/single-choice';
import { MultipleChoiceQuestion } from './quistion/multiple-choice/multiple-choice';

export type Props = Pick<
  GetCourseQuery['course']['pages'][number],
  '_id' | 'question' | 'progress'
>;

export default function QuizSection({
  question,
  progress,
  _id: pageId,
}: Props) {
  const router = useParams();
  const courseId = router.id as string;
  const [answers, setAnswers] = useState(progress?.answers ?? []);
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

  const { type, content } = question;

  const handleSubmit = async () => {
    const expectedAnswerIds = question?.answers?.map((answer) => answer?._id);

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

  const handleCHangeSingleChoiceQuestion = (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    setAnswers([e.target.value]);
  };

  const handleChangeMultipleChoiceQuestion = (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    let newAnswers = answers.map((a) => a);

    if (e.target.checked) {
      newAnswers.push(e.target.value);
    } else {
      newAnswers = newAnswers.filter((answer) => answer !== e.target.value);
    }

    setAnswers(newAnswers);
  };

  return (
    <Box
      sx={{
        gap: '2rem',
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontSize: '1.5rem' }}
        color={'warning.main'}
      >
        {content}
      </Typography>

      <Box>
        {type === QuestionType.SingleChoice ? (
          <SingleChoiceQuestion
            question={question}
            onChange={handleCHangeSingleChoiceQuestion}
            progress={progress}
          />
        ) : null}

        {type === QuestionType.MultipleChoice ? (
          <MultipleChoiceQuestion
            question={question}
            onChange={handleChangeMultipleChoiceQuestion}
            progress={progress}
          />
        ) : null}
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
