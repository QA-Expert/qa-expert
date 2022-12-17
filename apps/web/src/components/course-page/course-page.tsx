import { PageFragmentFragment as Props } from '../../__generated__/graphql';
import { Box } from '../box/box';
import { TextEditor } from '../text-editor/text-editor';
import { useEffect } from 'react';
import { GET_COURSE } from '../../graphql/queries/queries';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { CREATE_COURSE_PAGE_PROGRESS } from '../../graphql/mutations/mutations';
import { useError } from '../../../utils/hooks';

export default function CoursePage({ _id, content, progress }: Props) {
  const router = useRouter();
  const courseId = router.query.id as string;
  const [createProgress, { error }] = useMutation(CREATE_COURSE_PAGE_PROGRESS, {
    refetchQueries: [
      {
        query: GET_COURSE,
        variables: { _id: courseId },
      },
    ],
  });

  useError([error?.message]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!progress && courseId) {
        await createProgress({
          variables: {
            page: _id,
            course: courseId,
          },
        });
      }
    }, Number(process.env.NEXT_PUBLIC_TIME_TO_REVIEW_COURSE_PAGE));
    return () => clearTimeout(timer);
  }, [createProgress, _id, progress, courseId]);

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
