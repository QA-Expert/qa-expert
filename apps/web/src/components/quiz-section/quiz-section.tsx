'use client';

import Typography from '@mui/material/Typography';
import { Answer, GetCourseQuery, QuestionType } from '__generated__/graphql';
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
  options: Answer[];
  actualAnswers: string[];
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
  const [actualAnswers, setActualAnswers] = useState<string[]>([]);
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
    quizPageData(null);
    setData(undefined);
  }, []);

  useEffect(() => {
    if (!progress || !progress?.data) {
      quizPageData(null);
      setData(undefined);

      return;
    }

    try {
      const parsedData: Data = JSON.parse(progress?.data);

      setData(parsedData);
      quizPageData(parsedData);
    } catch (error) {
      //do nothing
    }

    return () => {
      quizPageData(null);
    };
  }, [progress]);

  useEffect(() => {
    setActualAnswers(progress?.answers ?? []);
  }, [progress?.answers]);

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
          actualAnswers: actualAnswers,
          expectedAnswers: question?.answers.map((answer) => answer._id),
          stringifiedData: JSON.stringify(data),
        },
      },
    });
  };

  const handleCHangeSingleChoiceQuestion = (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    setActualAnswers([e.target.value]);
  };

  const handleChangeMultipleChoiceQuestion = (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    let newAnswers = actualAnswers.map((a) => a);

    if (e.target.checked) {
      newAnswers.push(e.target.value);
    } else {
      newAnswers = newAnswers.filter((answer) => answer !== e.target.value);
    }

    setActualAnswers(newAnswers);
  };

  const handleQuestionDataChange = (data: Data) => {
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
            options={question.options}
            actualAnswers={actualAnswers}
            onChange={handleCHangeSingleChoiceQuestion}
          />
        ) : null}

        {type === QuestionType.MultipleChoice ? (
          <MultipleChoiceQuestion
            options={question.options}
            actualAnswers={actualAnswers}
            onChange={handleChangeMultipleChoiceQuestion}
          />
        ) : null}

        {type === QuestionType.Checklist ? (
          <ChecklistQuestion
            onChange={handleQuestionDataChange}
            progressData={data as ChecklistData}
          />
        ) : null}

        {type === QuestionType.TestCase ? (
          <Suspense fallback={'...Loading'}>
            <TestCaseQuestion
              onChange={handleQuestionDataChange}
              progressData={data as TestCaseData}
            />
          </Suspense>
        ) : null}

        {type === QuestionType.BugReport ? (
          <Suspense fallback={'...Loading'}>
            <BugReportQuestion
              onChange={handleQuestionDataChange}
              progressData={data as BugReportData}
            />
          </Suspense>
        ) : null}

        {type === QuestionType.RestApi ? (
          <Suspense fallback={'...Loading'}>
            <RestApiQuestion
              progressData={data as RestApiRequestData}
              expectedAnswerId={
                question.answers.find((answer) => answer._id)?._id
              }
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
