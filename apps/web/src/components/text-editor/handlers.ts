import { ReactQuillProps } from 'react-quill';

/**
 * @url https://quilljs.com/docs/modules/
 */
export const getToolbarConfig = ({
  excludeMedia = false,
}: {
  excludeMedia?: boolean;
}): NonNullable<ReactQuillProps['modules']> => {
  const media = !excludeMedia ? ['image', 'video'] : [];

  return {
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
      ['link', ...media, 'formula'],
      ['clean'],
    ],
    handlers: {},
  };
};
