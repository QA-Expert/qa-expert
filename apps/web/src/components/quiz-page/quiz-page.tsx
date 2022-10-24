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
import { isEqual } from 'lodash';

export default function QuizPage(props: Props) {
  const router = useRouter();
  const slug = router.query.slug ? router.query.slug[0] : null;
  const [answers, setAnswers] = useState<string[]>(
    props.progress?.answers ?? [],
  );
  const isSingleAnswerQuestion = props.question.answers.length === 1;
  const [createQuizProgress] = useMutation(CREATE_QUIZ_PROGRESS);

  const handleSubmit = async () => {
    const expectedAnswerIds = props.question.answers.map(
      (answer) => answer._id,
    );

    await createQuizProgress({
      variables: {
        // TODO: could not import enum "QuizPageProgressState" Module parse failed: Unexpected token
        state: isAnsweredCorrectly(expectedAnswerIds, answers)
          ? 'PASS'
          : 'FAIL',
        quiz: slug,
        quizPage: props._id,
        answers: answers,
      },
    });
  };

  const isAnsweredCorrectly = (expected: string[], actual: string[]) =>
    isEqual(expected, actual);

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
        {props.title}
      </Typography>

      <Typography>{props.description}</Typography>

      <Box sx={{ flex: 1, gap: '2rem' }}>
        <Typography variant="h4" sx={{ fontSize: '1.5rem' }}>
          {props.question.content}
        </Typography>

        <Box>
          {isSingleAnswerQuestion ? (
            <RadioGroup sx={{ gap: '0.5rem' }}>
              {props.question.options.map((option, i) => (
                <FormControlLabel
                  sx={{
                    ...getStylesForOptionsWhenAnswered(
                      props.progress?.answers,
                      props.question.answers.map((a) => a._id),
                      option._id,
                    ),
                  }}
                  key={i}
                  value={option._id}
                  disabled={Boolean(props.progress?.answers)}
                  control={
                    <Radio
                      checked={props.progress?.answers?.includes(option._id)}
                      onChange={handleChange}
                    />
                  }
                  label={option.content}
                />
              ))}
            </RadioGroup>
          ) : (
            <FormGroup sx={{ gap: '0.5rem' }}>
              {props.question.options.map((option, i) => (
                <FormControlLabel
                  sx={{
                    ...getStylesForOptionsWhenAnswered(
                      props.progress?.answers,
                      props.question.answers.map((a) => a._id),
                      option._id,
                    ),
                  }}
                  key={i}
                  value={option._id}
                  disabled={Boolean(props.progress?.answers)}
                  control={
                    <Checkbox
                      checked={props.progress?.answers?.includes(option._id)}
                      onChange={handleChange}
                    />
                  }
                  label={option.content}
                />
              ))}
            </FormGroup>
          )}
        </Box>

        {/* TODO: Just for testing - remove */}
        {/* <Box>
          <Typography fontWeight="bold">Correct answers:</Typography>
          {props.question.answers.map((a, i) => (
            <span key={i}>{a.content}</span>
          ))}
          <Typography fontWeight="bold">Users answers:</Typography>
          {answers.map((a, i) => (
            <span key={i}>{a}</span>
          ))}
        </Box> */}

        <Button
          variant="contained"
          disabled={Boolean(props.progress?.answers)}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
