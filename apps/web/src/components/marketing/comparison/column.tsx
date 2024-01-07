import { Row } from '@/components/row/row';
import { Tile } from '../tile/tile';
import { TileComponent } from '../tile/tile-content';
import { TileName } from '../tile/tile-name';
import { ReactNode } from 'react';
import { Props as FeatureProps } from '../features/feature-card';
type Props = {
  icon?: ReactNode;
  name?: string;
  selected?: boolean;
  rows: (
    | {
        feature?: FeatureProps;
        element: ReactNode;
      }
    | {
        feature: FeatureProps;
        element?: ReactNode;
      }
  )[];
};

export function Column({ rows, icon, name, selected }: Props) {
  return (
    <Tile
      sx={{
        width: '220px',
        outlineStyle: selected ? 'solid' : 'none',
        outlineWidth: selected ? '4px' : '1px',
        outlineColor: selected ? 'success.main' : 'secondary.main',
        borderColor: selected ? 'transparent' : 'secondary.main',
      }}
    >
      <TileComponent
        sx={{
          '&:last-child': {
            paddingLeft: 0,
            paddingRight: 0,
            paddingBottom: '1rem',
          },
        }}
      >
        {icon ? icon : null}

        {name ? <TileName selected={selected}>{name}</TileName> : null}

        {rows.map((row, i) => (
          <Row
            key={row.feature?.name ?? i}
            sx={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: selected ? 'success.dark' : 'primary.dark',
              height: '3rem',
            }}
          >
            {row.feature?.name ? row.feature?.name : null}
            {row.element ? row.element : null}
          </Row>
        ))}
      </TileComponent>
    </Tile>
  );
}
