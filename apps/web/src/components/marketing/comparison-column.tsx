import { ReactNode } from 'react';
import { Box } from '../box/box';
import { Typography } from '@mui/material';
import { Row } from '../row/row';

type Feature = {
  name: string;
  checked: boolean;
};

type Props = {
  icon: ReactNode;
  competitor: string;
  features: Feature[];
};

export function ComparisonColumn({ icon, competitor, features }: Props) {
  return (
    <Box>
      {icon}
      <Typography>{competitor}</Typography>
      {features.map((feature) => (
        <Row key={feature.name}>{feature.checked ? 'YES' : 'NO'}</Row>
      ))}
    </Box>
  );
}
