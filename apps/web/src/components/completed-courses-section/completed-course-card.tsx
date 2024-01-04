import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { GetAllCoursesQuery } from '__generated__/graphql';
import { Box } from '@/components/box/box';
import Link from 'next/link';
import { Row } from '@/components/row/row';
import { useTheme } from '@mui/material/styles';
import { getBackgroundColorForLevelLabel } from '@/components/card/handlers';
import { CARD_WIDTH } from './completed-courses-section';

type Props = Pick<
  GetAllCoursesQuery['courses'][number],
  '_id' | 'title' | 'level'
>;

export function CompletedCourseCard({ _id, title, level }: Props) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        width: CARD_WIDTH,
        minHeight: '100px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        outlineColor: 'transparent',
        backgroundColor: 'primary.light',
        '&:hover': {
          outline: '0.125rem solid',
          outlineColor: theme.palette.secondary.main,
          transition: '.2s outline ease',
        },
      }}
    >
      <Row sx={{ gap: 0 }}>
        <Box
          sx={{
            width: '1rem',
            minHeight: '100px',
            backgroundColor: getBackgroundColorForLevelLabel(level, theme),
          }}
        />

        <Box sx={{ padding: '1rem' }}>
          <CardHeader
            sx={{ padding: 0 }}
            title={title}
            titleTypographyProps={{
              fontSize: '1rem',
            }}
          />

          <Link href={`/course/${_id}`}>
            <Button variant="contained" color="success">
              Open Course
            </Button>
          </Link>
        </Box>
      </Row>
    </Card>
  );
}
