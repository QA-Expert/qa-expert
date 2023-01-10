import { useTheme } from '@mui/material/styles';
import { SVGProps } from 'react';

type Props = SVGProps<SVGSVGElement>;

export function ArrowIcon(props?: Props) {
  const theme = useTheme();

  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.5 1.75C4.32436 1.75 1.75 4.32436 1.75 7.5C1.75 10.6756 4.32436 13.25 7.5 13.25C10.6756 13.25 13.25 10.6756 13.25 7.5C13.25 4.32436 10.6756 1.75 7.5 1.75ZM0.75 7.5C0.75 3.77208 3.77208 0.75 7.5 0.75C11.2279 0.75 14.25 3.77208 14.25 7.5C14.25 11.2279 11.2279 14.25 7.5 14.25C3.77208 14.25 0.75 11.2279 0.75 7.5ZM7.5 4.5C7.77614 4.5 8 4.72386 8 5V8.79289L9.64645 7.14645C9.84171 6.95118 10.1583 6.95118 10.3536 7.14645C10.5488 7.34171 10.5488 7.65829 10.3536 7.85355L7.85355 10.3536C7.65829 10.5488 7.34171 10.5488 7.14645 10.3536L4.64645 7.85355C4.45118 7.65829 4.45118 7.34171 4.64645 7.14645C4.84171 6.95118 5.15829 6.95118 5.35355 7.14645L7 8.79289V5C7 4.72386 7.22386 4.5 7.5 4.5Z"
        fill={props?.color ? props?.color : theme.palette.text.secondary}
      />
    </svg>
  );
}
