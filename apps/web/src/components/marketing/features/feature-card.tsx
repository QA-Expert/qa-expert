'use client';

import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import { TileComponent } from '@/components/marketing/tile/tile-content';
import { TileName } from '@/components/marketing/tile/tile-name';
import Typography from '@mui/material/Typography/Typography';
import { Tile } from '@/components/marketing/tile/tile';

export type Props = {
  name: string;
  description: string;
};

export function FeatureCard({ name, description }: Props) {
  return (
    <Tile sx={{ width: '280px' }}>
      <TileComponent>
        <TipsAndUpdatesOutlinedIcon
          color="secondary"
          sx={{
            width: '3rem',
            height: '3rem',
          }}
        />
        <TileName>{name}</TileName>
        <Typography textAlign="center" variant="body1">
          {description}
        </Typography>
      </TileComponent>
    </Tile>
  );
}
