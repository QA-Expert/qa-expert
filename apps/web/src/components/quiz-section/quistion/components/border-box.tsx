import { Box } from '@/components/box/box';

export function BorderBox({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        gap: '1rem',
        width: '100%',
        border: '1px solid',
        borderColor: 'secondary.dark',
        borderRadius: '8px',
        padding: '1rem',
      }}
    >
      {children}
    </Box>
  );
}
