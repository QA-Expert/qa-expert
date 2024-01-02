'use client';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { CourseStates } from './course-states';
import { ProgressBar } from '../progress-bar/progress-bar';
import { Row } from '../row/row';
import { CourseMetrics } from './course-metrics';
import { useTheme } from '@mui/material/styles';
import { CourseLevelLabel } from './course-level-label';
import { Box } from '../box/box';
import { CardImage } from './card-image';
import { CardAccordion } from './card-accordion';
import { CardActions } from './card-actions';
import { getSelectedStyles } from '../../../utils/utils';
import { useParams } from 'next/navigation';
import { CourseProps } from '../../../app/courses/page';
import { Suspense } from 'react';
import { CircularProgress } from '@mui/material';

export function CardContainer(props: CourseProps) {
  const theme = useTheme();
  const params = useParams();

  const isSelected = params.id?.includes(props._id);
  const selectedStyles = isSelected ? getSelectedStyles(theme) : undefined;
  // TODO: Better way to figure out if user is Logged in
  // We need to look into cookie for access_token and validate it on UI as well
  const isUserLoggedInBasedOnProgress = 'progress' in props;

  return (
    <Card
      id={`course-${props._id}`}
      sx={{
        position: 'relative',
        width: '420px',
        minHeight: '320px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        outlineColor: 'transparent',
        '&:hover': {
          ...getSelectedStyles(theme),
          transition: '.2s outline ease',
        },
        [theme.breakpoints.down('md')]: {
          width: '320px',
        },
        ...selectedStyles,
      }}
      raised
    >
      <Row sx={{ backgroundColor: 'primary.light' }}>
        <CardHeader title={props.title} sx={{ height: '5rem' }} />

        <Box sx={{ alignSelf: 'flex-start' }}>
          <CourseLevelLabel level={props.level} />
        </Box>
      </Row>

      <Row
        sx={{
          gap: '1rem',
          [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
          },
        }}
      >
        <CardImage
          alt={props.title}
          src="/images/course-default-card.svg"
          width={250}
          breakPointWidth={320}
          height={150}
        >
          {isUserLoggedInBasedOnProgress && (
            <Suspense fallback={<CircularProgress />}>
              <CourseStates _id={props._id} />
            </Suspense>
          )}
        </CardImage>

        <CourseMetrics pages={props.pages} />
      </Row>

      <CardActions />

      {isUserLoggedInBasedOnProgress && <ProgressBar _id={props._id} />}

      <CardAccordion
        {...props}
        showOpenCourseButton={isUserLoggedInBasedOnProgress}
      />
    </Card>
  );
}
