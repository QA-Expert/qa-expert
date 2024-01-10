'use client';

import { useTheme } from '@mui/material/styles';
import { Course } from './progress';
import Card from '@mui/material/Card/Card';
import Typography from '@mui/material/Typography/Typography';
import Button from '@mui/material/Button/Button';
import Link from 'next/link';
import { StatusIndicator } from '@/components/status-indicator/status-indicator';
import { Row } from '@/components/row/row';
import { CourseLevelLabel } from '@/components/card/course-level-label';
import { ProgressBar } from '@/components/progress-bar/progress-bar';

type Props = {
  course: Course;
  showPRogressBar?: boolean;
};

export function ProgressCard({ course, showPRogressBar }: Props) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        width: '100%',
        borderRadius: '0.5rem',
        padding: '1rem',
        backgroundColor: 'primary.light',
      }}
    >
      <Row
        sx={{
          flexWrap: 'wrap',
          gap: '1rem',
          [theme.breakpoints.down('md')]: {
            justifyContent: 'center',
          },
        }}
      >
        <StatusIndicator state={course.progress.state} />

        <CourseLevelLabel isMinified level={course.level} />

        <Typography
          sx={{
            border: `1px solid ${theme.palette.secondary.main}`,
            borderRadius: '0.5rem',
            color: 'success.main',
            padding: '0.5rem',
            flex: 1,
          }}
        >
          {course.title}
        </Typography>

        <Link href={`/course/${course._id}`}>
          <Button color="success" variant="contained">
            open course
          </Button>
        </Link>
      </Row>

      {showPRogressBar ? <ProgressBar progress={course.progress} /> : null}
    </Card>
  );
}
