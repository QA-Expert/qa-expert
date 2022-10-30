import Typography from '@mui/material/Typography';
import { CoursePage as Props } from 'graphql-schema-gen/schema.gen';
import { Box } from '../box/box';
import { TextEditor } from '../text-editor/text-editor';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useEffect } from 'react';
import { CREATE_COURSE_PROGRESS } from '../../graphql/mutations/mutations';
import {
  GET_ALL_COURSES_AND_QUIZZES,
  GET_COURSE,
} from '../../graphql/queries/queries';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';

const TIME_TO_REVIEW_COURSE_PAGE = 60000; // 1 minute

export default function CoursePage(props: Props) {
  const router = useRouter();
  const slug = router.query.slug ? router.query.slug[0] : null;
  const [createCourseProgress] = useMutation(CREATE_COURSE_PROGRESS, {
    refetchQueries: [
      {
        query: GET_COURSE,
        variables: { courseId: slug },
      },
      {
        query: GET_ALL_COURSES_AND_QUIZZES,
      },
    ],
  });

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!props.progress) {
        await createCourseProgress({
          variables: {
            course: slug,
            coursePage: props._id,
          },
        });
      }
    }, TIME_TO_REVIEW_COURSE_PAGE);
    return () => clearTimeout(timer);
  }, [createCourseProgress, props._id, props.progress, slug]);

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
        {props.progress && (
          <CheckCircleIcon sx={{ color: 'success.main', fontSize: '3rem' }} />
        )}

        <Typography variant="h3" sx={{ fontSize: '1.5rem' }}>
          {props.title}
        </Typography>
      </Box>

      <Typography>{props.description}</Typography>

      <TextEditor initialContent={props.content} coursePageId={props._id} />
    </Box>
  );
}
