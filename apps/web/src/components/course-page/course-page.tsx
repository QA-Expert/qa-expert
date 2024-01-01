import { PageFragmentFragment as Props } from '../../__generated__/graphql';
import { Box } from '../box/box';
import { TextEditor } from '../text-editor/text-editor';
import { GET_COURSE } from '../../graphql/queries/queries';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { CREATE_COURSE_PAGE_PROGRESS } from '../../graphql/mutations/mutations';
import { useError } from '../../../utils/hooks';
import Button from '@mui/material/Button';

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

  const handleSubmit = async () => {
    if (!courseId) {
      return;
    }

    await createProgress({
      variables: {
        page: _id,
        course: courseId,
      },
    });
  };

  return (
    <Box
      sx={{
        flex: '1',
        gap: '2rem',
      }}
    >
      {content ? <TextEditor pageContent={content} pageId={_id} /> : null}

      <Button
        variant="contained"
        disabled={Boolean(progress)}
        onClick={handleSubmit}
        color="success"
      >
        Complete Reading
      </Button>
    </Box>
  );
}
