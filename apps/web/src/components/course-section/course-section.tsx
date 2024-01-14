'use client';

import { Box } from '@/components/box/box';
import { TextEditor } from '@/components/text-editor/text-editor';
import { GET_COURSE, GET_USER } from 'graphql/queries/queries';
import { useParams } from 'next/navigation';
import { useMutation } from '@apollo/client';
import {
  CREATE_COURSE_PAGE_PROGRESS,
  UPDATE_COURSE_PAGE_CONTENT,
} from 'graphql/mutations/mutations';
import { useError } from 'utils/hooks';
import Button from '@mui/material/Button';
import { GetCourseQuery } from '__generated__/graphql';
import { useState } from 'react';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';

type CoursePage = GetCourseQuery['course']['pages'][number];
type Content = CoursePage['content'];
type Props = Pick<CoursePage, '_id' | 'content' | 'progress'>;

export default function CourseSection({
  _id,
  content: initialContent,
  progress,
}: Props) {
  const [content, setContent] = useState<Content>(initialContent);
  const router = useParams();
  const courseId = router.id as string;
  const { data } = useSuspenseQuery(GET_USER);
  const user = data?.user;
  // TODO: make roles as string union on back end.
  const isAdmin = user?.roles.includes('admin');
  const [createProgress, { error }] = useMutation(CREATE_COURSE_PAGE_PROGRESS, {
    refetchQueries: [
      {
        query: GET_COURSE,
        variables: { _id: courseId },
      },
    ],
  });
  const [updateCoursePageContent, { error: updateError }] = useMutation(
    UPDATE_COURSE_PAGE_CONTENT,
    {
      refetchQueries: [
        {
          query: GET_COURSE,
          variables: { _id: courseId },
        },
      ],
    },
  );

  useError([error?.message, updateError?.message]);

  const handleSubmit = async () => {
    if (!courseId) {
      return;
    }

    await createProgress({
      variables: {
        page: _id,
        course: courseId,
      },
    });
  };

  const handleSave = async () => {
    if (!content) {
      return;
    }

    await updateCoursePageContent({
      variables: {
        _id: _id,
        content,
      },
    });
  };

  return (
    <Box
      sx={{
        gap: '2rem',
      }}
    >
      {content ? (
        <>
          <TextEditor
            initialValue={content}
            onChange={setContent}
            allowFormatting={isAdmin}
            readOnly={!isAdmin}
          />
          {isAdmin ? (
            <Button variant="contained" onClick={handleSave}>
              Submit
            </Button>
          ) : null}
        </>
      ) : null}

      <Button
        size="large"
        variant="contained"
        disabled={Boolean(progress)}
        onClick={handleSubmit}
        color="success"
      >
        Complete Reading
      </Button>
    </Box>
  );
}
