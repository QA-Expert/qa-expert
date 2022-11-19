import { PageFragmentFragment as Props } from '../../__generated__/graphql';
import { Box } from '../box/box';
import { TextEditor } from '../text-editor/text-editor';
import { useEffect } from 'react';
import { GET_ALL_COURSES, GET_COURSE } from '../../graphql/queries/queries';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { CREATE_COURSE_PAGE_PROGRESS } from '../../graphql/mutations/mutations';

const TIME_TO_REVIEW_COURSE_PAGE = 60000; // 1 minute

export default function CoursePage({ _id, content, progress }: Props) {
  const router = useRouter();
  const slug = router.query.slug ? router.query.slug[0] : '';
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
      if (!progress && slug) {
        await createProgress({
          variables: {
            page: _id,
            course: slug,
          },
        });
      }
    }, TIME_TO_REVIEW_COURSE_PAGE);
    return () => clearTimeout(timer);
  }, [createProgress, _id, progress, slug]);

  return (
    <Box
      sx={{
        flex: '1',
      }}
    >
      {content && <TextEditor initialContent={content} pageId={_id} />}
    </Box>
  );
}
