import { useMemo } from 'react';
import { Props as FeatureProps } from '../features/feature-card';
import { Column } from './column';

export function FeaturesColumn({ features }: { features: FeatureProps[] }) {
  const rows = useMemo(
    () =>
      features.map((feature) => ({
        feature,
      })),
    [features],
  );

  return <Column rows={rows} />;
}
