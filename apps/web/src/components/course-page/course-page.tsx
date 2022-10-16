import { Box } from '@mui/material';
import { CoursePage as Props } from 'graphql-schema-gen/schema.gen';

export default function CoursePage(props: Props) {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h2>{props.title}</h2>
      <p>{props.description}</p>
      <Box>{props.content}</Box>
    </Box>
  );
}
