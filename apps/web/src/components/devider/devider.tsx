import { styled } from '@stitches/react';

export const Devider = styled('div', {
  backgroundColor: '$border',

  variants: {
    orientation: {
      horizontal: {
        height: '$1',
        width: '100%',
      },
      verstical: {
        width: '$1',
        heigh: '100%',
      },
    },
  },
});
