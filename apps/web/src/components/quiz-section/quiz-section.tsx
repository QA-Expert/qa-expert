'use client';

import Typography from '@mui/material/Typography';
import { GetCourseQuery, QuestionType } from '__generated__/graphql';
import { Box } from '@/components/box/box';
import { ChangeEvent, Suspense, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useMutation } from '@apollo/client';
import { useParams } from 'next/navigation';
import { CREATE_QUIZ_PAGE_PROGRESS } from 'graphql/mutations/mutations';
import { GET_COURSE } from 'graphql/queries/queries';
import { useError } from 'utils/hooks';
import { SingleChoiceQuestion } from './quistion/single-choice/single-choice';
import { MultipleChoiceQuestion } from './quistion/multiple-choice/multiple-choice';
import {
  ChecklistData,
  ChecklistQuestion,
} from './quistion/checklist/checklist';
import { TestCaseData, TestCaseQuestion } from './quistion/test-case/test-case';
import {
  BugReportData,
  BugReportQuestion,
} from './quistion/bug-report/bug-report';
import {
  RestApiRequestData,
  RestApiQuestion,
} from './quistion/rest-api/rest-api';
import { quizPageData } from 'apollo/store';

export type Props = Pick<
  GetCourseQuery['course']['pages'][number],
  '_id' | 'question' | 'progress'
>;

export type QuestionProps = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  question: Props['question'];
};

export type Data =
  | RestApiRequestData
  | TestCaseData
  | BugReportData
  | ChecklistData
  | undefined;

export default function QuizSection({
  question,
  progress,
  _id: pageId,
}: Props) {
  const router = useParams();
  const courseId = router.id as string;
  const [answers, setAnswers] = useState(progress?.answers ?? []);
  const [data, setData] = useState<Data>();
  const [createProgress, { error }] = useMutation(CREATE_QUIZ_PAGE_PROGRESS, {
    refetchQueries: [
      {
        query: GET_COURSE,
        variables: {
          _id: courseId,
        },
      },
    ],
  });

  useError([error?.message]);

  useEffect(() => {
    if (!progress?.data) {
      return;
    }

    try {
      const parsedData: Data = JSON.parse(progress?.data);

      setData(parsedData);
    } catch (error) {
      //do nothing
    }
  }, [progress?.data]);

  if (!question) {
    return null;
  }

  const { type, content } = question;

  const handleSubmit = async () => {
    await createProgress({
      variables: {
        data: {
          page: pageId,
          course: courseId,
          questionType: question?.type,
          answers: answers,
          expectedAnswers: question?.answers.map((answer) => answer._id),
          stringifiedData: JSON.stringify(data),
        },
      },
    });
  };

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

  const handleQuestionDataChange = (data: Data) => {
    console.log('submit data to OpenAI to validate answer', data);
    setData(data);
    quizPageData(data);
  };

  return (
    <Box
      sx={{
        gap: '2rem',
        width: '100%',
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontSize: '1.5rem' }}
        color={'warning.main'}
      >
        {content}
      </Typography>

      <Box sx={{ width: '100%' }}>
        {type === QuestionType.SingleChoice ? (
          <SingleChoiceQuestion
            question={question}
            onChange={handleCHangeSingleChoiceQuestion}
          />
        ) : null}

        {type === QuestionType.MultipleChoice ? (
          <MultipleChoiceQuestion
            question={question}
            onChange={handleChangeMultipleChoiceQuestion}
          />
        ) : null}

        {type === QuestionType.Checklist ? (
          <ChecklistQuestion
            progressData={data as ChecklistData}
            onChange={handleQuestionDataChange}
          />
        ) : null}

        {type === QuestionType.TestCase ? (
          <Suspense fallback={'...Loading'}>
            <TestCaseQuestion
              progressData={data as TestCaseData}
              onChange={handleQuestionDataChange}
            />
          </Suspense>
        ) : null}

        {type === QuestionType.BugReport ? (
          <Suspense fallback={'...Loading'}>
            <BugReportQuestion
              progressData={data as BugReportData}
              onChange={handleQuestionDataChange}
            />
          </Suspense>
        ) : null}

        {type === QuestionType.RestApi ? (
          <Suspense fallback={'...Loading'}>
            <RestApiQuestion
              progressData={data as RestApiRequestData}
              onChange={handleQuestionDataChange}
            />
          </Suspense>
        ) : null}
      </Box>

      <Button
        size="large"
        variant="contained"
        disabled={Boolean(progress) || !courseId}
        onClick={handleSubmit}
        color="success"
      >
        Submit
      </Button>
    </Box>
  );
}
