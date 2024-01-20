'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { Box } from '@/components/box/box';
import { styled } from '@mui/material/styles';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';
import { ReactQuillProps, Value } from 'react-quill';
import CircularProgress from '@mui/material/CircularProgress';

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
    loading: () => <CircularProgress />,
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
  initialValue,
  onChange,
  allowFormatting = false,
  modules,
  readOnly = false,
}: Props) => {
  const [isInitValueSet, setIsInitValueSet] = useState(false);
  const [content, setContent] = useState<Value>();

  useEffect(() => {
    if (!initialValue || isInitValueSet) {
      return;
    }

    try {
      const value = JSON.parse(initialValue);

      setContent(value);
    } catch (error) {
      setContent(initialValue);
    } finally {
      setIsInitValueSet(true);
    }
  }, [initialValue, isInitValueSet]);

  const handleChange: ReactQuillProps['onChange'] = (...args) => {
    const [value] = args;

    setContent(value);

    onChange(...args);
  };

  return (
    <Box
      sx={{
        width: '100%',
        gap: '1rem',
        flex: 1,
        height: '100%',
        justifyContent: 'flex-start',
      }}
    >
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
    // Styles specifically for code - block formatting button in toobar.
    // In case if we want to render Editor with only code formatting option
    '.ql-code-block:only-child': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '0.5rem',
      width: '100%',
      fontSize: '1rem',
      visibility: 'hidden',
      '&:hover': {
        '::before': {
          backgroundColor: muiTheme.palette.secondary.dark,
          color: muiTheme.palette.secondary.main,
        },
      },
      '&.ql-active': {
        color: muiTheme.palette.secondary.light,
        '::before': {
          backgroundColor: muiTheme.palette.secondary.dark,
          color: muiTheme.palette.secondary.main,
        },
      },
      '&::before': {
        content: '"Enable Code Editor"',
        visibility: 'visible',
        padding: '0.25rem',
        marginBottom: '0.5rem',
        border: '1px solid',
        borderColor: muiTheme.palette.secondary.main,
        borderRadius: '4px',
        color: muiTheme.palette.text.secondary,
      },
    },
  },
  '& .ql-container': {
    border: 'none',
    borderRadius: '4px',
    '.ql-editor': {
      fontSize: '1rem',
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
    },
    '.ql-tooltip .ql-editing': {},
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
  '& .ql-snow .ql-tooltip div["data-mode"]': {
    position: 'relative',
    top: 0,
    left: 0,
    transform: 'none',
  },
}));
