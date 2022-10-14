import { CoursePage as Props } from 'graphql-schema-gen/schema.gen';
import { Block } from '../block/block';

export default function CoursePage(props: Props) {
  return (
    <Block orientation="column" size="fill">
      <h2>{props.title}</h2>
      <p>{props.desciption}</p>
      <Block>{props.content}</Block>
    </Block>
  );
}
