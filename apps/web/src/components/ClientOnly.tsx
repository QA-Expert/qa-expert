import { useEffect, useState } from 'react';
import { styled } from '../../stitches.config';
import { Block } from './block/block';

/**
 *
 * This component is used for handling Graphql Appolo useQuiery hook
 * The problem it solves is that we have hybrite mode for fetching data: server-side and client-side
 * Using useQuiery will cuase fetch on server-side meanwhile component could get rendered in browser before data is recived
 * So this Component that wraps around the most parent client-side react component helps to solve problem
 * where data will be fetched only on client-side
 */
export default function ClientOnly({
  children,
  ...delegated
}: {
  children: React.ReactNode;
}) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <Element size="fill" as="div" {...delegated}>
      {children}
    </Element>
  );
}

const Element = styled(Block);
