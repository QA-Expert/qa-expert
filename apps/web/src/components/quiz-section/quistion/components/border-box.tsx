import { Box } from '@/components/box/box';
import { BoxProps } from '@mui/material';

export function BorderBox({
  children,
  sx,
}: {
  children: React.ReactNode;
  sx?: BoxProps['sx'];
}) {
  return (
    <Box
      sx={{
        gap: '1rem',
        width: '100%',
        border: '1px solid',
        borderColor: 'secondary.dark',
        borderRadius: '8px',
        padding: '1rem',
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
