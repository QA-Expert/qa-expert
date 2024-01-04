'use client';

import Button from '@mui/material/Button';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { Box } from '@/components/box/box';
import { DeltaStatic, Sources } from 'quill';
import { UPDATE_COURSE_PAGE_CONTENT } from 'graphql/mutations/mutations';
import { useMutation } from '@apollo/client';
import { GET_COURSE, GET_USER } from 'graphql/queries/queries';
import { useParams } from 'next/navigation';
import { useError } from 'utils/hooks';
import { UnprivilegedEditor, ReactQuillProps, Value } from 'react-quill';
// NOTE: I have to user emotion directly - not mui/styled as mui has built in "theme" prop
// that conflicts with "theme" on Quill component
import styled from '@emotion/styled';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';

const ReactQuillWrapper = dynamic(() => import('react-quill'), {
  ssr: false,
});

interface Props {
  pageContent: string;
  pageId: string;
}

/**
 * @url https://quilljs.com/docs/modules/
 */
const FULL_TOOL_BAR: ReactQuillProps['modules'] = {
  container: [
    [{ font: [] }, { size: ['small', false, 'large', 'huge'] }], // custom dropdown
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ header: 1 }, { header: 2 }, 'blockquote', 'code-block'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    [{ direction: 'rtl' }, { align: [] }],
    ['link', 'image', 'video', 'formula'],
    ['clean'],
  ],
  handlers: {},
} as const;

export const TextEditor = ({ pageContent, pageId }: Props) => {
  const { data } = useSuspenseQuery(GET_USER);
  const user = data?.user;
  const router = useParams();
  const courseId = router.id as string;
  // TODO: make roles as string union on back end.
  const isAdmin = user?.roles.includes('admin');
  const [content, setContent] = useState<Value | undefined>();
  const [updateCoursePageContent, { error }] = useMutation(
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

  useEffect(() => {
    try {
      const content: Value = JSON.parse(pageContent);

      setContent(content);
    } catch (error) {
      // if failed to parse - it means it is a regular string not a JSON. So we set it to our local variable
      setContent(pageContent);
    }
  }, [pageContent]);

  useError([error?.message]);

  const handleClick = async () => {
    const stringified = JSON.stringify(content);

    await updateCoursePageContent({
      variables: {
        _id: pageId,
        content: stringified,
      },
    });
  };

  const handleChange = useCallback(
    () =>
      (
        _content: string,
        _delta: DeltaStatic,
        _source: Sources,
        editor: UnprivilegedEditor,
      ) => {
        setContent(editor.getContents());
      },
    [],
  );

  return (
    <Box sx={{ width: '100%', gap: '1rem' }}>
      <Editor
        isAdmin={Boolean(isAdmin)}
        modules={{
          toolbar: isAdmin ? FULL_TOOL_BAR : false,
        }}
        theme={isAdmin ? 'snow' : ''}
        value={content}
        onChange={handleChange}
        readOnly={!isAdmin}
      />

      {isAdmin && (
        <Button variant="contained" onClick={handleClick}>
          Submit
        </Button>
      )}
    </Box>
  );
};

const Editor = styled(ReactQuillWrapper)(
  ({ isAdmin }: { isAdmin: boolean }) => ({
    width: '100%',
    '.ql-container': {
      border: isAdmin ? '1px solid #ccc' : 'none',
    },
  }),
);
