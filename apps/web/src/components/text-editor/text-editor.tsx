import Button from '@mui/material/Button';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { Box } from '../box/box';
import { DeltaStatic, Sources } from 'quill';
import { UnprivilegedEditor } from 'react-quill';
import { UPDATE_COURSE_PAGE_CONTENT } from '../../graphql/mutations/mutations';
import { useMutation } from '@apollo/client';
import styled from '@emotion/styled';
import { GET_COURSE } from '../../graphql/queries/queries';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { userAtom } from '../../store';
import { useError } from '../../../utils/hooks';

const ReactQuill = dynamic(
  () => {
    return import('react-quill');
  },
  { ssr: false },
);

const fullToolBar = [
  [{ font: [] }, { size: ['small', false, 'large', 'huge'] }], // custom dropdown
  ['bold', 'italic', 'underline', 'strike'],
  [{ color: [] }, { background: [] }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ header: 1 }, { header: 2 }, 'blockquote', 'code-block'],
  [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
  [{ direction: 'rtl' }, { align: [] }],
  ['link', 'image', 'video', 'formula'],
  ['clean'],
];
interface Props {
  initialContent: string;
  pageId: string;
}

export const TextEditor = ({ initialContent, pageId }: Props) => {
  const [user] = useAtom(userAtom);
  const router = useRouter();
  const courseId = router.query.id as string;
  // TODO: make roles as string union on back end.
  const isAdmin = user?.roles.includes('admin');
  let initContent: string | DeltaStatic;

  try {
    initContent = JSON.parse(initialContent);
  } catch (error) {
    initContent = initialContent;
  }

  const [content, setContent] = useState<string | DeltaStatic>(initContent);
  const [deltaStatic, setDeltaStatic] = useState<DeltaStatic | null>(null);
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

  useError([error?.message]);

  const handleClick = async () => {
    const stringified = JSON.stringify(deltaStatic);

    await updateCoursePageContent({
      variables: {
        _id: pageId,
        content: stringified,
      },
    });
  };

  const handleChange = (
    content: string,
    _delta: DeltaStatic,
    _source: Sources,
    editor: UnprivilegedEditor,
  ) => {
    setContent(content);
    setDeltaStatic(editor.getContents());
  };

  return (
    <Box sx={{ width: '100%', gap: '1rem' }}>
      <Editor
        isAdmin={Boolean(isAdmin)}
        modules={{
          toolbar: isAdmin ? fullToolBar : false,
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

const Editor = styled(ReactQuill)(({ isAdmin }: { isAdmin: boolean }) => ({
  width: '100%',
  '.ql-container': {
    border: isAdmin ? '1px solid #ccc' : 'none',
  },
}));
