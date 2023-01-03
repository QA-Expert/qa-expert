import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { CourseType, GetAllCoursesQuery } from '../../__generated__/graphql';
import IconButton from '@mui/material/IconButton';
import CardActions from '@mui/material/CardActions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Collapse from '@mui/material/Collapse';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useState } from 'react';

type Props = Pick<
  GetAllCoursesQuery['courses'][number],
  'title' | 'description' | 'pages'
>;

export function CardComponent({ title, description, pages }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card
      sx={{
        width: '300px',
        minHeight: '275px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      raised
    >
      <CardHeader title={title} sx={{ textAlign: 'center' }} />

      <CardMedia
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          padding: '0.5rem',
          backgroundColor: 'grey.400',
        }}
      >
        <Image
          alt={`${title}`}
          width={'100%'}
          height={'100%'}
          src={`/images/course-default-card.svg`}
          objectFit="cover"
        />
      </CardMedia>

      <CardContent sx={{ alignSelf: 'start' }}>
        <Typography variant="body2" color="text.secondary">
          Slides:
          {pages.filter((page) => page.type === CourseType.Course).length}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Questions:
          {pages.filter((page) => page.type === CourseType.Quiz).length}
        </Typography>
      </CardContent>

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

        <Button
          onClick={(e) => {
            e.preventDefault();
            setExpanded(!expanded);
          }}
          aria-expanded={expanded}
          aria-label="show description button"
        >
          Show Description
        </Button>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
