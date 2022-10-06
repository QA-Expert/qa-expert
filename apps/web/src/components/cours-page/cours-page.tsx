import { CoursPage as Props } from 'graphql-schema/schema.gen';
import { Block } from '../block/block';

export default function CoursPage(props: Props) {
  return (
    <Block orientation="column" size="fill">
      <h2>{props.title}</h2>
      <p>{props.desciption}</p>
      <Block>{props.content}</Block>
    </Block>
  );
}
