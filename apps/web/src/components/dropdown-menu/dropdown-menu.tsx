import { styled } from '@stitches/react';
import { Block } from '../block/block';

interface Props {
  name: string;
  menuItems: {
    handleClick: () => void;
    name: string;
  }[];
}

export const DropdownMenu = ({ menuItems, name }: Props) => {
  return (
    <DropdownContainer orientation="column">
      <Block>{name}</Block>
      <DropdownContent as="ul" orientation="column">
        {menuItems?.map((item, index: number) => (
          <Block as="li" key={index} onClick={item.handleClick}>
            {item.name}
          </Block>
        ))}
      </DropdownContent>
    </DropdownContainer>
  );
};

const DropdownContainer = styled(Block, {});

const DropdownContent = styled(Block, {
  display: 'none',
  gap: '$1',
  backgroundColor: '$white',
  position: 'absolute',
  boxShadow: ' $bottom',
  padding: '$1',
  zIndex: '$dropdownMenu',
  '&:hover': {
    display: 'flex',
  },
});
