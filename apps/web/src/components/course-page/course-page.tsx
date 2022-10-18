import Typography from '@mui/material/Typography';
import { CoursePage as Props } from 'graphql-schema-gen/schema.gen';
import { Box } from '../box/box';

export default function CoursePage(props: Props) {
  return (
    <Box
      sx={{
        width: '100%',
        justifyContent: 'start',
        height: '100%',
        padding: '1rem',
        gap: '0.75rem',
      }}
    >
      <Typography variant="h3" sx={{ fontSize: '1.5rem' }}>
        {props.title}
      </Typography>
      <Typography>{props.description}</Typography>
      <Box sx={{ flex: 1 }}>{props.content}</Box>
    </Box>
  );
}
