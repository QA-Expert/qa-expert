import { Box } from '../box/box';
import { Row } from '../row/row';
import { FeatureCard, Props as FeatureProps } from './feature-card';

const FEATURES: FeatureProps[] = [
  {
    title: 'Feature 1',
    description:
      'ExamplesLorem ipsum dolor sit amet consectetur. Rhoncus viverra non sed ac risus. Faucibus urna aliquam vulputate urna nascetur justo. Sit imperdiet cursus',
  },
  {
    title: 'Feature 2',
    description:
      'ExamplesLorem ipsum dolor sit amet consectetur. Rhoncus viverra non sed ac risus. Faucibus urna aliquam vulputate urna nascetur justo. Sit imperdiet cursus',
  },
  {
    title: 'Feature 3',
    description:
      'ExamplesLorem ipsum dolor sit amet consectetur. Rhoncus viverra non sed ac risus. Faucibus urna aliquam vulputate urna nascetur justo. Sit imperdiet cursus',
  },
  {
    title: 'Feature 4',
    description:
      'ExamplesLorem ipsum dolor sit amet consectetur. Rhoncus viverra non sed ac risus. Faucibus urna aliquam vulputate urna nascetur justo. Sit imperdiet cursus',
  },
  {
    title: 'Feature 5',
    description:
      'ExamplesLorem ipsum dolor sit amet consectetur. Rhoncus viverra non sed ac risus. Faucibus urna aliquam vulputate urna nascetur justo. Sit imperdiet cursus',
  },
  {
    title: 'Feature 6',
    description:
      'ExamplesLorem ipsum dolor sit amet consectetur. Rhoncus viverra non sed ac risus. Faucibus urna aliquam vulputate urna nascetur justo. Sit imperdiet cursus',
  },
  {
    title: 'Feature 7',
    description:
      'ExamplesLorem ipsum dolor sit amet consectetur. Rhoncus viverra non sed ac risus. Faucibus urna aliquam vulputate urna nascetur justo. Sit imperdiet cursus',
  },
  {
    title: 'Feature 8',
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
        <FeatureCard key={feature.title} {...feature} />
      ))}
    </Row>
  );
}
