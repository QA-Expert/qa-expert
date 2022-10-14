import { styled } from '@stitches/react';
import { ReactNode, useState } from 'react';
import { Block } from '../block/block';
import { Chewron } from '../chewron/chewron';

type Props = {
  children: ReactNode;
};

export default function Sidebar({ children }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setIsOpen(isOpen ? false : true);
  };

  return (
    <Element width="description" isOpen={isOpen}>
      <Content isOpen={isOpen} orientation="column" size="fill">
        {children}
      </Content>
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
        width: '$7',
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
  padding: 0,
  marginRight: '$1-2',
});

const Content = styled(Block, {
  overflow: 'hidden',
  justifyContent: 'start',
  transition: 'opacity 0.5s linear',

  variants: {
    isOpen: {
      false: {
        opacity: 0,
      },
    },
  },
});
