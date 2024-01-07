'use client';

import { Row } from '@/components/row/row';
import { Box } from '@/components/box/box';
import Typography from '@mui/material/Typography/Typography';
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';
import { getBackgroundStyles } from '../handlers';
import Button from '@mui/material/Button/Button';

const CONTEXT = {
  header: "it's easy to become an IT specialist",
  paragraph:
    'Lorem ipsum dolor sit amet consectetur. Rhoncus viverra non sed ac risus. Faucibus urna aliquam vulputate urna nascetur justo. Sit imperdiet cursus blandit quam felis nunc aliquet nec. Viverra ut venenatis purus ullamcorper platea.',
};

export function Heading() {
  const theme = useTheme();

  return (
    <Row
      sx={{
        minHeight: '720px',
        alignItems: 'start',
        justifyContent: 'space-between',
        paddingLeft: '5rem',
        ...getBackgroundStyles('waives', theme),
        [theme.breakpoints.down('md')]: {
          paddingLeft: '1rem',
          gap: '0.75rem',
          minHeight: '610px',
          flexDirection: 'column',
        },
      }}
    >
      <Box
        sx={{
          flex: 0.32,
          height: '100%',
          gap: '2rem',
          [theme.breakpoints.down('md')]: {
            gap: '0.75rem',
            flex: 1,
          },
        }}
      >
        <Typography
          variant="h1"
          sx={{
            [theme.breakpoints.down('md')]: {
              fontSize: '3rem',
            },
          }}
          color="secondary.main"
        >
          {CONTEXT.header}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {CONTEXT.paragraph}
        </Typography>

        <Button size="large" color="warning" variant="contained">
          Start FREE Today
        </Button>
      </Box>

      <Box
        sx={{
          height: '630px',
          flex: 0.5,
          position: 'relative',
          [theme.breakpoints.down('md')]: {
            display: 'none',
          },
        }}
      >
        <Image
          alt={'hero image'}
          fill
          src={'/images/hero.png'}
          priority
          style={{ objectFit: 'fill' }}
        />
      </Box>
    </Row>
  );
}
