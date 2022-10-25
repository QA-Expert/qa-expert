import Typography from '@mui/material/Typography';
import { CoursePage as Props } from 'graphql-schema-gen/schema.gen';
import { Box } from '../box/box';
import { TextEditor } from '../text-editor/text-editor';

export default function CoursePage(props: Props) {
  return (
    <Box
      sx={{
        width: '100%',
        justifyContent: 'start',
        height: '100%',
        padding: '1rem',
        gap: '1rem',
      }}
    >
      <Typography variant="h3" sx={{ fontSize: '1.5rem' }}>
        {props.title}
      </Typography>

      <Typography>{props.description}</Typography>

      <TextEditor initialContent={props.content} coursePageId={props._id} />
    </Box>
  );
}
