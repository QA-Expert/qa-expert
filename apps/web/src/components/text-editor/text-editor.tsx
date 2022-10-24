import Button from '@mui/material/Button';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { Box } from '../box/box';
import { DeltaStatic, Sources } from 'quill';
import { UnprivilegedEditor } from 'react-quill';

const ReactQuill = dynamic(
  () => {
    return import('react-quill');
  },
  { ssr: false },
);

const fullToolBar = {
  toolbar: [
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
};

interface Props {
  initialContent: string | DeltaStatic;
}

export const TextEditor = ({ initialContent }: Props) => {
  const [content, setContent] = useState<string | DeltaStatic>(initialContent);
  const [deltaStatic, setDeltaStatic] = useState<DeltaStatic | null>(null);

  const handleClick = () => {
    console.log(deltaStatic);
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
    <Box>
      <ReactQuill
        modules={fullToolBar}
        theme="snow"
        value={content}
        onChange={handleChange}
      />
      ;
      <Button variant="contained" onClick={handleClick}>
        Submit
      </Button>
    </Box>
  );
};
