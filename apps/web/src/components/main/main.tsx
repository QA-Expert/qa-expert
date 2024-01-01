import { ReactNode, useEffect, useState } from 'react';
import { Box } from '../box/box';

/**
 *
 * This component is used for handling Graphql Apollo useQuery hook
 * The problem it solves is that we have hydrate mode for fetching data: server-side and client-side
 * Using useQuery will cause fetch on server-side meanwhile component could get rendered in browser before data is received
 * So this Component that wraps around the most parent client-side react component helps to solve problem
 * where data will be fetched only on client-side
 */
export default function Main({
  children,
  ...delegated
}: {
  children: ReactNode;
}) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <Box
      sx={{
        flexDirection: 'row',
        flex: 1,
        backgroundColor: 'background',
      }}
      component="main"
      {...delegated}
    >
      {children}
    </Box>
  );
}
