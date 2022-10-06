import { QuizPage as Props } from 'graphql-schema/schema.gen';
import { Block } from '../block/block';

export default function QuizPage(props: Props) {
  return (
    <Block orientation="column" size="fill">
      <h2>{props.title}</h2>
      <p>{props.desciption}</p>
      <Block orientation="column" css={{ gap: '$3', alignItems: 'start' }}>
        {props.questions.map((q, i) => (
          <div key={i}>{q.content}</div>
        ))}
      </Block>
    </Block>
  );
}
