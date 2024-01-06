'use client';

import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import { CardContentComponent } from '@/components/marketing/card/card-content';
import { CardName } from '@/components/marketing/card/card-name';
import Typography from '@mui/material/Typography/Typography';
import { CardContainer } from '@/components/marketing/card/card';

export type Props = {
  name: string;
  description: string;
};

export function FeatureCard({ name, description }: Props) {
  return (
    <CardContainer sx={{ width: '280px' }}>
      <CardContentComponent>
        <TipsAndUpdatesOutlinedIcon
          color="secondary"
          sx={{
            width: '3rem',
            height: '3rem',
          }}
        />
        <CardName>{name}</CardName>
        <Typography textAlign="center" variant="body1">
          {description}
        </Typography>
      </CardContentComponent>
    </CardContainer>
  );
}
