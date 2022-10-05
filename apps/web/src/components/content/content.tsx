import { styled } from '@stitches/react';
import { Block } from '../block/block';

export const Content = styled(Block, {
  flexDirection: 'column',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: '$4',
  backgroundColor: '$backround',
  color: '$primaryText',
  padding: '$4',
  variants: {
    orientation: {
      horizontal: {
        flexDirection: 'column',
      },
      vertical: {
        flexDirection: 'row',
      },
    },
  },
});
