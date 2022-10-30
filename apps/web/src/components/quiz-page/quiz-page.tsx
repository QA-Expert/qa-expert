import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import { Page as Props } from 'graphql-schema-gen/schema.gen';
import { Box } from '../box/box';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import { ChangeEvent, useState } from 'react';
import Button from '@mui/material/Button';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { difference } from 'lodash';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { CREATE_QUIZ_PAGE_PROGRESS } from '../../graphql/mutations/mutations';
import { GET_ALL_COURSES, GET_COURSE } from '../../graphql/queries/queries';

export default function QuizPage({
  question,
  title,
  description,
  progress,
  _id,
}: Props) {
  const router = useRouter();
  const slug = router.query.slug ? router.query.slug[0] : null;
  const [answers, setAnswers] = useState<string[]>(progress?.answers ?? []);
  const isSingleAnswerQuestion = question?.answers.length === 1;
  const [createProgress] = useMutation(CREATE_QUIZ_PAGE_PROGRESS, {
    refetchQueries: [
      {
        query: GET_COURSE,
        variables: { _id: slug },
      },
      {
        query: GET_ALL_COURSES,
      },
    ],
  });

  if (!question) {
    return null;
  }

  const handleSubmit = async () => {
    const expectedAnswerIds = question?.answers.map((answer) => answer._id);

    await createProgress({
      variables: {
        // TODO: could not import enum "QuizPageProgressState" Module parse failed: Unexpected token
        state: isAnsweredCorrectly(expectedAnswerIds, answers)
          ? 'PASS'
          : 'FAIL',
        page: _id,
        answers: answers,
      },
    });
  };

  const isAnsweredCorrectly = (expected: string[], actual: string[]) =>
    !difference(expected, actual).length;

  const getStylesForOptionsWhenAnswered = (
    actualAnswers: string[] | null | undefined,
    expectedAnswers: string[],
    optionId: string,
  ) =>
    actualAnswers && {
      margin: 0,
      border: 'solid 0.125rem',
      borderRadius: '0.25rem',
      padding: '0.25rem',
      borderColor: expectedAnswers.includes(optionId)
        ? 'success.main'
        : 'error.main',
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
        gap: '2rem',
      }}
    >
      <Typography variant="h3" sx={{ fontSize: '1.5rem' }}>
        {title}
      </Typography>

      <Typography>{description}</Typography>

      <Box sx={{ flex: 1, gap: '2rem' }}>
        <Box sx={{ flexDirection: 'row', gap: '1rem' }}>
          {progress?.state === 'PASS' && (
            <CheckCircleIcon sx={{ color: 'success.main', fontSize: '3rem' }} />
          )}
          {progress?.state === 'FAIL' && (
            <CancelIcon sx={{ color: 'error.main', fontSize: '3rem' }} />
          )}
          <Typography variant="h4" sx={{ fontSize: '1.5rem' }}>
            {question.content}
          </Typography>
        </Box>

        <Box>
          {isSingleAnswerQuestion ? (
            <RadioGroup sx={{ gap: '0.5rem' }}>
              {question.options.map((option, i) => (
                <FormControlLabel
                  sx={{
                    ...getStylesForOptionsWhenAnswered(
                      progress?.answers,
                      question.answers.map((a) => a._id),
                      option._id,
                    ),
                  }}
                  key={i}
                  value={option._id}
                  disabled={Boolean(progress?.answers)}
                  control={
                    <Radio
                      checked={progress?.answers?.includes(option._id)}
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
                  sx={{
                    ...getStylesForOptionsWhenAnswered(
                      progress?.answers,
                      question.answers.map((a) => a._id) ?? [],
                      option._id,
                    ),
                  }}
                  key={i}
                  value={option._id}
                  disabled={Boolean(progress?.answers)}
                  control={
                    <Checkbox
                      checked={progress?.answers?.includes(option._id)}
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
          disabled={Boolean(progress?.answers)}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
