import { Row } from '../row/row';
import { ExampleCard, Props as ExampleCardProps } from './example-card';

const EXAMPLES: ExampleCardProps[] = [
  {
    title: 'feature 1',
    description:
      'ExamplesLorem ipsum dolor sit amet consectetur. Rhoncus viverra non sed ac risus. Faucibus urna aliquam vulputate urna nascetur justo. Sit imperdiet cursus',
    videoId: 'xuP4g7IDgDM?si=u0ZF268Eo7Zp4QQO',
  },
  {
    title: 'feature 2',
    description:
      'ExamplesLorem ipsum dolor sit amet consectetur. Rhoncus viverra non sed ac risus. Faucibus urna aliquam vulputate urna nascetur justo. Sit imperdiet cursus',
    videoId: 'xuP4g7IDgDM?si=u0ZF268Eo7Zp4QQO',
  },
  {
    title: 'feature 3',
    description:
      'ExamplesLorem ipsum dolor sit amet consectetur. Rhoncus viverra non sed ac risus. Faucibus urna aliquam vulputate urna nascetur justo. Sit imperdiet cursus',
    videoId: 'xuP4g7IDgDM?si=u0ZF268Eo7Zp4QQO',
  },
  {
    title: 'feature 4',
    description:
      'ExamplesLorem ipsum dolor sit amet consectetur. Rhoncus viverra non sed ac risus. Faucibus urna aliquam vulputate urna nascetur justo. Sit imperdiet cursus',
    videoId: 'xuP4g7IDgDM?si=u0ZF268Eo7Zp4QQO',
  },
];

export function Examples() {
  return (
    <Row
      sx={{
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
      }}
    >
      {EXAMPLES.map((example) => (
        <ExampleCard key={example.title} {...example} />
      ))}
    </Row>
  );
}
