'use client';

import { Avatar, CardProps } from '@mui/material';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Box } from '@/components/box/box';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import { Row } from '@/components/row/row';
import { stringAvatar } from '../handlers';

const getSocialIcon = (name: Props['socials'][number]['name']) => {
  switch (name) {
    case 'linkedin':
      return <LinkedInIcon sx={{ fontSize: '2rem' }} />;

    case 'facebook':
      return <FacebookIcon sx={{ fontSize: '2rem' }} />;

    case 'website':
      return <HomeIcon sx={{ fontSize: '2rem' }} />;

    case 'email':
      return <EmailIcon sx={{ fontSize: '2rem' }} />;

    default:
      break;
  }
};

export type Props = {
  name: string;
  title: string;
  description: string;
  avatar: string;
  socials: {
    name: 'linkedin' | 'facebook' | 'email' | 'tweeter' | 'website';
    url: string;
  }[];
} & CardProps;

export function CardComponent(props: Props) {
  const { name, description, avatar, socials, title } = props;

  return (
    <Card sx={{ width: '550px', padding: '1rem' }}>
      <Row
        sx={{
          padding: '1rem',
          justifyContent: 'start',
          alignItems: 'start',
          gap: '1rem',
        }}
      >
        <Box sx={{ gap: '1rem' }}>
          <Avatar
            alt={name}
            src={avatar}
            {...stringAvatar(name)}
            sx={{ width: 160, height: 160 }}
          />

          <Row sx={{ justifyContent: 'center' }}>
            {socials.map((social) => {
              const icon = getSocialIcon(social.name);

              return (
                <a key={social.name} href={social.url} target="_blank">
                  {icon}
                </a>
              );
            })}
          </Row>
        </Box>

        <Box sx={{ justifyContent: 'start', alignItems: 'start' }}>
          <Typography
            variant="h3"
            sx={{ textTransform: 'uppercase', fontSize: '1rem' }}
          >
            {name}
          </Typography>
          <Typography variant="h4" sx={{ fontSize: '1rem' }}>
            {title}
          </Typography>

          <Divider
            variant="fullWidth"
            sx={{ backgroundColor: 'secondary.main' }}
            light
            flexItem
          />

          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            {description}
          </Typography>
        </Box>
      </Row>
    </Card>
  );
}
