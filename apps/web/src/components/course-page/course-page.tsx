import { CoursePage as Props } from 'graphql-schema-gen/schema.gen';
import { Box } from '../box/box';

export default function CoursePage(props: Props) {
  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <h2>{props.title}</h2>
      <p>{props.description}</p>
      <Box>{props.content}</Box>
    </Box>
  );
}
