import { styled } from '@stitches/react';

export const Block = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  variants: {
    size: {
      fill: {
        width: '100%',
        height: '100%',
      },
    },
  },
});
