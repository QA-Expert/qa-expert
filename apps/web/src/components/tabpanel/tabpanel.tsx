import { Box } from '@/components/box/box';

type Props = {
  children: React.ReactNode;
  index: number;
  value: number;
};

export function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export function Tabpanel({ children, value, index }: Props) {
  return (
    <Box
      role="tabpanel"
      display={value !== index ? 'none' : 'flex'}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      sx={{ width: '100%', display: value !== index ? 'none' : 'flex' }}
    >
      {value === index && (
        <Box sx={{ width: '100%', gap: '1rem' }}>{children}</Box>
      )}
    </Box>
  );
}
