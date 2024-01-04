import { ReactNode } from 'react';
import { Box } from '@/components/box/box';

export default function Main({
  children,
  ...delegated
}: {
  children: ReactNode;
}) {
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
