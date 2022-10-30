import Typography from '@mui/material/Typography';
import { Page as Props } from 'graphql-schema-gen/schema.gen';
import { Box } from '../box/box';
import { TextEditor } from '../text-editor/text-editor';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useEffect } from 'react';
import { GET_ALL_COURSES, GET_COURSE } from '../../graphql/queries/queries';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { CREATE_COURSE_PAGE_PROGRESS } from '../../graphql/mutations/mutations';

const TIME_TO_REVIEW_COURSE_PAGE = 60000; // 1 minute

export default function CoursePage({
  _id,
  title,
  description,
  content,
  progress,
}: Props) {
  const router = useRouter();
  const slug = router.query.slug ? router.query.slug[0] : null;
  const [createProgress] = useMutation(CREATE_COURSE_PAGE_PROGRESS, {
    refetchQueries: [
      {
        query: GET_COURSE,
        variables: { _id: slug },
      },
      {
        query: GET_ALL_COURSES,
      },
    ],
  });

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!progress) {
        await createProgress({
          variables: {
            page: _id,
          },
        });
      }
    }, TIME_TO_REVIEW_COURSE_PAGE);
    return () => clearTimeout(timer);
  }, [createProgress, _id, progress, slug]);

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
      <Box sx={{ flexDirection: 'row', gap: '1rem' }}>
        {progress && (
          <CheckCircleIcon sx={{ color: 'success.main', fontSize: '3rem' }} />
        )}

        <Typography variant="h3" sx={{ fontSize: '1.5rem' }}>
          {title}
        </Typography>
      </Box>

      <Typography>{description}</Typography>

      {content && <TextEditor initialContent={content} pageId={_id} />}
    </Box>
  );
}
