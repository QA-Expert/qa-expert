import { useTheme } from '@mui/material/styles';
import { SVGProps } from 'react';

type Props = SVGProps<SVGSVGElement>;

export function AIIcon(props?: Props) {
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
        d="M12.5 9C12.2239 9 12 9.22386 12 9.5V12H9.5C9.22386 12 9 12.2239 9 12.5C9 12.7761 9.22386 13 9.5 13H12.5C12.7761 13 13 12.7761 13 12.5V9.5C13 9.22386 12.7761 9 12.5 9Z"
        fill={props?.color ? props?.color : theme.palette.text.secondary}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.5 4C12.2239 4 12 3.77614 12 3.5V1H9.5C9.22386 1 9 0.776142 9 0.5C9 0.223858 9.22386 0 9.5 0H12.5C12.7761 0 13 0.223858 13 0.5V3.5C13 3.77614 12.7761 4 12.5 4Z"
        fill={props?.color ? props?.color : theme.palette.text.secondary}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.5 9C0.776142 9 1 9.22386 1 9.5V12H3.5C3.77614 12 4 12.2239 4 12.5C4 12.7761 3.77614 13 3.5 13H0.5C0.223858 13 0 12.7761 0 12.5V9.5C0 9.22386 0.223858 9 0.5 9Z"
        fill={props?.color ? props?.color : theme.palette.text.secondary}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.5 4C0.776142 4 1 3.77614 1 3.5V1H3.5C3.77614 1 4 0.776142 4 0.5C4 0.223858 3.77614 0 3.5 0H0.5C0.223858 0 0 0.223858 0 0.5V3.5C0 3.77614 0.223858 4 0.5 4Z"
        fill={props?.color ? props?.color : theme.palette.text.secondary}
      />
      <rect
        x="8"
        y="3"
        width="1"
        height="2"
        rx="0.5"
        fill={props?.color ? props?.color : theme.palette.text.secondary}
      />
      <rect
        x="4"
        y="3"
        width="1"
        height="2"
        rx="0.5"
        fill={props?.color ? props?.color : theme.palette.text.secondary}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.00002 4.5C6.00002 4.22386 6.22387 4 6.50002 4C6.77616 4 7.00002 4.22386 7.00002 4.5V6.5C7.00002 6.67107 6.9141 6.82208 6.78307 6.91222C6.76632 6.94849 6.74492 6.98332 6.71879 7.01588L6.09284 7.79574C5.91999 8.0111 5.60529 8.04555 5.38993 7.8727C5.17458 7.69985 5.14013 7.38515 5.31298 7.16979L5.93893 6.38993C5.95772 6.36652 5.97818 6.34525 6.00002 6.32615V4.5ZM7.51323 8.73359C7.76988 8.63167 7.99986 8.85295 8.00072 9.12909C8.00158 9.40523 7.77279 9.64721 7.53097 9.78054C7.42227 9.84048 7.31292 9.91373 7.20816 9.99188C6.79578 10.2995 6.20194 10.2995 5.78857 9.99317C5.68639 9.91746 5.57989 9.84656 5.47398 9.78836C5.23198 9.65535 5.00159 9.41454 5.00073 9.13839C4.99988 8.86225 5.22854 8.6395 5.48568 8.74017C5.60917 8.78851 5.72755 8.84832 5.84255 8.90643L5.84256 8.90643C6.0702 9.02145 6.28457 9.12976 6.49893 9.1291C6.71336 9.12843 6.92779 9.01879 7.15551 8.90236L7.15551 8.90236C7.27077 8.84343 7.38944 8.78275 7.51323 8.73359Z"
        fill={props?.color ? props?.color : theme.palette.text.secondary}
      />
    </svg>
  );
}
