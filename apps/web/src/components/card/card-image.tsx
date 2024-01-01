import CardMedia from '@mui/material/CardMedia';
import { Box } from '../box/box';
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';
import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  alt: string;
  width: number;
  height: number;
  breakPointWidth?: number;
  src: string;
};

export function CardImage({
  children,
  src,
  alt,
  width,
  height,
  breakPointWidth,
}: Props) {
  const theme = useTheme();

  return (
    <CardMedia
      sx={{
        display: 'flex',
        justifyContent: 'start',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          width: width,
          height: height,
          [theme.breakpoints.down('md')]: {
            width: width && !breakPointWidth ? width : breakPointWidth,
          },
          position: 'relative',
        }}
      >
        <Image
          alt={alt}
          fill
          src={src}
          priority
          style={{ objectFit: 'cover' }}
        />
      </Box>

      {children}
    </CardMedia>
  );
}
