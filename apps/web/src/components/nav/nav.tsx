import { styled } from '@stitches/react';
import Link from 'next/link';
import { Block } from '../block/block';
import { Button } from '../button/button';
import { Logout } from '../logout/logout';
import { useTheme } from './theme.hook';

export default function Nav() {
  const { themName, toggleTheme } = useTheme();

  return (
    <Navigation as="nav">
      <Header>
        <Link href={`/`}>
          <a>Navigation</a>
        </Link>
      </Header>
      <Link href={`/login`}>
        <Button as="a" bg="primary" position="left">
          Login
        </Button>
      </Link>
      <Logout />
      <Button type="button" bg="primary" position="left" onClick={toggleTheme}>
        {themName}
      </Button>
    </Navigation>
  );
}

const Header = styled('h1', {
  color: '$header',
  padding: 0,
  margin: 0,
});

const Navigation = styled(Block, {
  width: '100%',
  height: '$8',
  backgroundColor: '$navBackground',
  color: '$primaryText',
  padding: '$3',
  boxShadow: '$around',
  zIndex: '$navbar',
});
