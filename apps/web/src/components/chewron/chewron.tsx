import { styled } from '@stitches/react';

export const Chewron = styled('button', {
  color: '$primaryText',
  fontSize: '32px',
  fontWeight: 900,
  backgroundColor: 'transparent',

  border: 'none',
  '&:disabled': {
    color: '$disabledText',
  },

  '&:hover': {
    color: '$disabledText',
  },

  variants: {
    direction: {
      forward: {
        '&::after': {
          content: '>',
        },
      },
      backward: {
        '&::after': {
          content: '<',
        },
      },
    },
  },
});
