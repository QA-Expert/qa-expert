import { Row } from '@/components/row/row';
import {
  FeatureCard,
  Props as FeatureProps,
} from '@/components/marketing/features/feature-card';

export const FEATURES: FeatureProps[] = [
  {
    name: 'Feature 1',
    description:
      'ExamplesLorem ipsum dolor sit amet consectetur. Rhoncus viverra non sed ac risus. Faucibus urna aliquam vulputate urna nascetur justo. Sit imperdiet cursus',
  },
  {
    name: 'Feature 2',
    description:
      'ExamplesLorem ipsum dolor sit amet consectetur. Rhoncus viverra non sed ac risus. Faucibus urna aliquam vulputate urna nascetur justo. Sit imperdiet cursus',
  },
  {
    name: 'Feature 3',
    description:
      'ExamplesLorem ipsum dolor sit amet consectetur. Rhoncus viverra non sed ac risus. Faucibus urna aliquam vulputate urna nascetur justo. Sit imperdiet cursus',
  },
  {
    name: 'Feature 4',
    description:
      'ExamplesLorem ipsum dolor sit amet consectetur. Rhoncus viverra non sed ac risus. Faucibus urna aliquam vulputate urna nascetur justo. Sit imperdiet cursus',
  },
  {
    name: 'Feature 5',
    description:
      'ExamplesLorem ipsum dolor sit amet consectetur. Rhoncus viverra non sed ac risus. Faucibus urna aliquam vulputate urna nascetur justo. Sit imperdiet cursus',
  },
  {
    name: 'Feature 6',
    description:
      'ExamplesLorem ipsum dolor sit amet consectetur. Rhoncus viverra non sed ac risus. Faucibus urna aliquam vulputate urna nascetur justo. Sit imperdiet cursus',
  },
  {
    name: 'Feature 7',
    description:
      'ExamplesLorem ipsum dolor sit amet consectetur. Rhoncus viverra non sed ac risus. Faucibus urna aliquam vulputate urna nascetur justo. Sit imperdiet cursus',
  },
  {
    name: 'Feature 8',
    description:
      'ExamplesLorem ipsum dolor sit amet consectetur. Rhoncus viverra non sed ac risus. Faucibus urna aliquam vulputate urna nascetur justo. Sit imperdiet cursus',
  },
];

export function Features() {
  return (
    <Row
      sx={{
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
      }}
    >
      {FEATURES.map((feature) => (
        <FeatureCard key={feature.name} {...feature} />
      ))}
    </Row>
  );
}
