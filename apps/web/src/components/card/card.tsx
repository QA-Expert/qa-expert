import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {
  Course,
  Quiz,
  ProgressPercentage,
} from 'graphql-schema-gen/schema.gen';
import Image from 'next/image';
import Link from 'next/link';
import { Box } from '../box/box';
import { ProgressBar } from '../progress-bar/progress-bar';

interface Props extends Pick<Course | Quiz, '_id' | 'title' | 'description'> {
  type: 'course' | 'quiz';
  progress: ProgressPercentage;
}

export const CardComponent = ({
  _id,
  title,
  description,
  type,
  progress,
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

          <ProgressBar {...progress} />
        </Box>
      </a>
    </Link>
  );
};
