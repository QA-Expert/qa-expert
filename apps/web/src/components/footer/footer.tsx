import { styled } from '@stitches/react';
import { Block } from '../block/block';

export default function Footer() {
  return <Element as="footer">Footer</Element>;
}

const Element = styled(Block, {
  backgroundColor: '$navBackground',
  color: '$primaryText',
  padding: '$2',
  width: '100%',
  boxShadow: '$around',
});
