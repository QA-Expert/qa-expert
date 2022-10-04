import { styled } from '@stitches/react';
import { ReactNode } from 'react';
import { Block } from '../block/block';
import ClientOnly from '../ClientOnly';

type Props = {
  children: ReactNode;
};

export default function Main({ children }: Props) {
  return (
    <Element as="main" size="fill">
      <ClientOnly>{children}</ClientOnly>
    </Element>
  );
}

const Element = styled(Block, {
  backgroundColor: '$background',
  color: '$primaryText',
});
