'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { Box } from '@/components/box/box';
import { styled } from '@mui/material/styles';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';
import { ReactQuillProps, Value } from 'react-quill';

const ReactQuillWrapper = dynamic(
  () => {
    hljs.configure({
      // optionally configure hljs
      languages: ['javascript', 'xml', 'json'],
    });

    window.hljs = hljs;

    return import('react-quill');
  },
  {
    ssr: false,
  },
);

type Props = {
  allowFormatting?: boolean;
  modules?: ReactQuillProps['modules'];
  initialValue?: string;
} & Required<Pick<ReactQuillProps, 'onChange' | 'readOnly'>>;

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

export const TextEditor = ({
  initialValue = '',
  onChange,
  allowFormatting = false,
  modules,
  readOnly = false,
}: Props) => {
  const [content, setContent] = useState<Value>(initialValue);

  useEffect(() => {
    try {
      const content: Value = JSON.parse(initialValue);

      setContent(content);
    } catch (error) {
      // if failed to parse - it means it is a regular string not a JSON. So we set it to our local variable
      setContent(initialValue);
    }
  }, [initialValue]);

  const handleChange: ReactQuillProps['onChange'] = (...args) => {
    const [value] = args;

    setContent(value);

    onChange(...args);
  };

  return (
    <Box sx={{ width: '100%', gap: '1rem', flex: 1, height: '100%' }}>
      <Editor
        modules={{
          ...modules,
          syntax: true,
          toolbar: allowFormatting ? FULL_TOOL_BAR : modules?.toolbar ?? false,
        }}
        quillTheme="snow"
        value={content}
        onChange={handleChange}
        readOnly={readOnly}
      />
    </Box>
  );
};

const Editor = styled(
  (props: ReactQuillProps & { quillTheme: ReactQuillProps['theme'] }) => (
    <ReactQuillWrapper {...props} theme={props.quillTheme} />
  ),
)(({ theme: muiTheme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  '& .ql-toolbar': {
    border: 'none',
    padding: 0,
    '.ql-formats *': {
      color: muiTheme.palette.secondary.main,
      stroke: muiTheme.palette.secondary.main,
      '&.ql-fill': {
        fill: muiTheme.palette.secondary.main,
        stroke: 'none',
      },
    },
  },
  '& .ql-container': {
    border: 'none',
    borderRadius: '4px',
  },
  '& .ql-editor': {
    fontSize: '1rem',
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
  },
  '& .ql-syntax': {
    margin: 0,
    height: '100%',
    borderRadius: '4px',
  },
  '& .ql-snow .ql-editor pre': {
    margin: 0,
    padding: '0.5rem',
  },
}));
