import { Box } from '@/components/box/box';
import { Section } from '@/components/section/section';

export function TestAppSection() {
  return (
    <Section sx={{ flex: 0.75 }}>
      <Box
        sx={{
          gap: '2rem',
          flex: 1,
        }}
      >
        Test
      </Box>
    </Section>
  );
}
