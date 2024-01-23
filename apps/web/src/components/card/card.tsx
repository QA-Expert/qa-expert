'use client';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { CourseStates } from './course-states';
import { ProgressBar } from '@/components/progress-bar/progress-bar';
import { Row } from '@/components/row/row';
import { CourseMetrics } from './course-metrics';
import { useTheme } from '@mui/material/styles';
import { CourseLevelLabel } from './course-level-label';
import { Box } from '@/components/box/box';
import { CardImage } from './card-image';
import { CardAccordion } from './card-accordion';
import { CardActions } from './card-actions';
import { getSelectedStyles } from 'utils/utils';
import { CourseProps } from 'app/courses/page';
import { useReactiveVar } from '@apollo/client';
import { isAuthenticated, selectedCourseId } from 'apollo/store';
import { GetCourseQuery } from '__generated__/graphql';
import { Suspense, useEffect, useState } from 'react';

export function CardContainer(props: CourseProps) {
  const theme = useTheme();
  const isUserAuthenticated = useReactiveVar(isAuthenticated);
  const selectedId = useReactiveVar(selectedCourseId);
  const [selectedStyles, setSelectedStyles] =
    useState<ReturnType<typeof getSelectedStyles>>();

  useEffect(() => {
    if (props._id === selectedId) {
      setSelectedStyles(getSelectedStyles(theme));
    } else {
      setSelectedStyles(undefined);
    }
  }, [props._id, theme, selectedId]);

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
          {isUserAuthenticated && (
            <Suspense fallback={'...Loading'}>
              {/* Since user is authenticated we know that it is course with all
              props that is why it is safe to do type cast */}
              <CourseStates {...(props as GetCourseQuery['course'])} />
            </Suspense>
          )}
        </CardImage>

        <CourseMetrics pages={props.pages} />
      </Row>

      <CardActions
        courseId={props._id}
        likes={props.likes}
        isLiked={'isLiked' in props ? props.isLiked : undefined}
      />

      {isUserAuthenticated && 'progress' in props && (
        /* Since user is authenticated we know that it is course with all props that is why it is safe to do type cast */
        <ProgressBar progress={props.progress} />
      )}

      <CardAccordion {...props} showOpenCourseButton={isUserAuthenticated} />
    </Card>
  );
}
