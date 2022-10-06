import { styled } from '@stitches/react';
import { useState } from 'react';
import { Block } from '../block/block';
import { Chewron } from '../chewron/chewron';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setIsOpen(isOpen ? false : true);
  };

  return (
    <Element width="description" isOpen={isOpen}>
      <Toggle
        direction={isOpen ? 'forward' : 'backward'}
        onClick={handleOpen}
      />
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
      false: {
        width: '$6-2',
      },
    },
  },
});

const Toggle = styled(Chewron, {
  height: '100%',
  width: '$6-2',
  borderStyle: 'none',
  marginLeft: 'auto',
  backgroundColor: 'inherit',
});
