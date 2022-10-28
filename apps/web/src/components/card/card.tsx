import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { Course, Quiz } from 'graphql-schema-gen/schema.gen';
import Image from 'next/image';
import Link from 'next/link';
import { Box } from '../box/box';

interface Props extends Pick<Course | Quiz, '_id' | 'title' | 'description'> {
  type: 'course' | 'quiz';
  progress: number;
}

export const CardComponent = ({
  _id,
  title,
  description,
  type,
  progress = 25,
}: Props) => {
  return (
    <Link href={`/${type}/${_id}`}>
      <a>
        <Box
          sx={{
            gap: '0.75rem',
            transition: 'transform .4s',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        >
          <Card
            sx={{
              minWidth: '15rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            raised
          >
            <CardHeader title={title} />
            <CardMedia>
              <Image
                alt={`${type} ${title}`}
                width={'100%'}
                height={'100%'}
                src={`/images/${type}-default-card.svg`}
                objectFit="cover"
              />
            </CardMedia>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            </CardContent>
          </Card>

          <Box sx={{ flexDirection: 'row', width: '100%', gap: '0.5rem' }}>
            <LinearProgress
              color="success"
              sx={{ width: '100%', height: '1rem', borderRadius: '0.25rem' }}
              variant="determinate"
              value={progress}
            />
            <Typography
              sx={{ position: 'absolute' }}
            >{`${progress}%`}</Typography>
          </Box>
        </Box>
      </a>
    </Link>
  );
};
