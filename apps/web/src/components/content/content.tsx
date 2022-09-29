import { styled } from '@stitches/react';
import { ReactNode } from 'react';
import { Block } from '../block/block';

type Props = {
  children: ReactNode;
};

export default function Content({ children }: Props) {
  return <Element size="fill">{children}</Element>;
}

const Element = styled(Block, {
  alignItems: 'start',
  alignContent: 'start',
  flexWrap: 'wrap',
  gap: '$4',
  backgroundColor: '$backround',
  color: '$primaryText',
  padding: '$4',
});
