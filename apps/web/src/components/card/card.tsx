import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import {
  CourseProgressState,
  CourseType,
  GetAllCoursesQuery,
} from '../../__generated__/graphql';
import IconButton from '@mui/material/IconButton';
import CardActions from '@mui/material/CardActions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ButtonGroup from '@mui/material/ButtonGroup';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import LayersIcon from '@mui/icons-material/Layers';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '../box/box';
import { styled, useTheme } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { ReactNode } from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DoneAll from '@mui/icons-material/DoneAll';

type CourseProps = Pick<
  GetAllCoursesQuery['courses'][number],
  'title' | 'description' | 'pages' | 'recommendedCourses'
>;

type Props = {
  children?: ReactNode;
};

export function CardComponent({
  title,
  description,
  pages,
  recommendedCourses,
  children,
}: Props & CourseProps) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        width: '320px',
        minHeight: '320px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        outlineColor: 'transparent',
        '&:hover': {
          outline: '0.125rem solid',
          outlineColor: theme.palette.secondary.main,
          transition: '.2s outline ease',
        },
      }}
      raised
    >
      <CardHeader title={title} sx={{ textAlign: 'center', height: '6rem' }} />

      <CardMedia
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Image
          alt={`${title}`}
          width={'200px'}
          height={'150px'}
          src={`/images/course-default-card.svg`}
          objectFit="cover"
        />
        <CardContent sx={{ alignSelf: 'start', flex: 1 }}>
          <Row>
            <LayersIcon sx={{ color: 'text.secondary', width: '1rem' }} />
            <Typography variant="body2" color="text.secondary">
              Slides:
              {pages.filter((page) => page.type === CourseType.Course).length}
            </Typography>
          </Row>

          <Row>
            <LiveHelpIcon sx={{ color: 'text.secondary', width: '1rem' }} />
            <Typography variant="body2" color="text.secondary">
              Questions:
              {pages.filter((page) => page.type === CourseType.Quiz).length}
            </Typography>
          </Row>
        </CardContent>
      </CardMedia>

      <CardActions
        sx={{
          display: 'flex',
          gap: '0.5rem',
          marginTop: 'auto',
          alignSelf: 'start',
          width: '100%',
        }}
      >
        <ButtonGroup
          aria-label="course card actions button group"
          sx={{ flex: '1' }}
        >
          <IconButton
            aria-label="add to favorites"
            onClick={async (e) => {
              e.preventDefault();
            }}
          >
            <FavoriteIcon />
          </IconButton>
          <IconButton
            aria-label="share"
            onClick={async (e) => {
              e.preventDefault();
            }}
          >
            <ShareIcon />
          </IconButton>
        </ButtonGroup>
      </CardActions>

      {children}

      <Accordion
        sx={{ width: '100%', color: 'text.secondary' }}
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="show-description-accordion"
          id="show-description-accordion"
        >
          <Typography>Description</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ fontSize: '0.875rem' }}>{description}</Typography>
          {recommendedCourses.length > 0 && (
            <List>
              <Typography variant="subtitle2" color="text.secondary">
                Next recommended courses
              </Typography>
              {recommendedCourses.map((course) => (
                <ListItem key={course.title}>
                  <ListItemText primary={course.title} />
                  {course.progress?.state === CourseProgressState.Pass && (
                    <ListItemIcon>
                      <DoneAll />
                    </ListItemIcon>
                  )}
                </ListItem>
              ))}
            </List>
          )}
        </AccordionDetails>
      </Accordion>
    </Card>
  );
}

const Row = styled(Box)(() => ({
  justifyContent: 'start',
  gap: '0.5rem',
  flexDirection: 'row',
}));
