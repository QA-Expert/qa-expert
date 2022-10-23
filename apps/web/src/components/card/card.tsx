import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Course, Quiz } from 'graphql-schema-gen/schema.gen';
import Image from 'next/image';
import Link from 'next/link';

interface Props extends Pick<Course | Quiz, '_id' | 'title' | 'description'> {
  type: 'course' | 'quiz';
}

export const CardComponent = ({ _id, title, description, type }: Props) => {
  return (
    <Link href={`/${type}/${_id}`}>
      <a>
        <Card
          sx={{
            width: '15%',
            minWidth: '10rem',
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
      </a>
    </Link>
  );
};
