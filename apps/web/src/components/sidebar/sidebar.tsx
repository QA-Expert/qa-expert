import { styled } from '@stitches/react';
import { useState } from 'react';
import { Block } from '../block/block';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setIsOpen(isOpen ? false : true);
  };

  return (
    <Element width="description" isOpen={isOpen}>
      <Toggle as="button" onClick={handleOpen}>
        <Chewron>{isOpen ? '›' : '‹'}</Chewron>
      </Toggle>
    </Element>
  );
}

const Element = styled(Block, {
  height: '100%',
  backgroundColor: '$navBackground',
  color: '$primaryText',
  transition: 'width 0.5s',
  variants: {
    width: {
      description: {
        width: '35%',
      },
    },
    isOpen: {
      true: {
        width: '24px',
      },
    },
  },
});

const Toggle = styled(Block, {
  height: '100%',
  width: '24px',
  borderStyle: 'none',
  marginLeft: 'auto',
  backgroundColor: 'inherit',
});

const Chewron = styled('span', {
  color: '$primaryText',
  fontSize: '32px',
  fontWeight: 900,
});
