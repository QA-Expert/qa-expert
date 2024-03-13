'use client';

import { GET_CLAIMED_BADGE } from 'graphql/queries/queries';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Button from '@mui/material/Button/Button';
import { Section } from '@/components/section/section';
import { Row } from '@/components/row/row';
import Image from 'next/image';
import { styled, useTheme } from '@mui/material/styles';
import { Box } from '@/components/box/box';
import { SectionTitle } from '@/components/section/title';
import Divider from '@mui/material/Divider/Divider';
import Typography from '@mui/material/Typography/Typography';
import MuiLink from '@mui/material/Link';
import { format } from 'date-fns';
import { DATE_FORMAT } from 'constants/constants';
import { getStudentName } from 'utils/utils';

/**
 * @description Routing App component that represents a route for a Claimed Badge
 *
 * Mostly this route should be used to share badge with social media
 * Most of social media sharing takes only url
 */
const ClaimedBadge = () => {
  const params = useParams();
  const { data } = useSuspenseQuery(GET_CLAIMED_BADGE, {
    variables: { _id: params.id as string },
  });
  const theme = useTheme();
  const { badge, user, createdAt } = data.claimedBadge;
  const studentName = getStudentName(user);

  return (
    <Section
      sx={{
        flex: 3.5,
        padding: '2rem',
        gap: '1.5rem',
      }}
    >
      <SectionTitle>{badge.title}</SectionTitle>

      <Divider
        variant="fullWidth"
        sx={{ backgroundColor: 'warning.main' }}
        flexItem
      />

      <Row
        sx={{
          justifyContent: 'center',
          gap: '2rem',
          [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
          },
        }}
      >
        <Box>
          <Image
            src="/images/badge-default-icon.png"
            alt={`badge image - ${badge.title}`}
            width={300}
            height={300}
          />

          <Typography sx={{ color: 'secondary.main' }}>
            Unlocked on {format(createdAt, DATE_FORMAT)}
          </Typography>
        </Box>

        <Box
          sx={{
            alignItems: 'flex-start',
            gap: '1rem',
          }}
        >
          <SecondaryText>
            We{`'`}re thrilled to congratulate {studentName} for successfully
            completing our{' '}
            <MuiLink
              target="_blank"
              href={`/courses#course-${badge.course?._id}`}
              component={Link}
            >
              {badge.course?.title}
            </MuiLink>{' '}
            course! 🌟📚
          </SecondaryText>

          <SecondaryText>{`${user.firstName} ${user.lastName} has demonstrated dedication, commitment, 
          and a thirst for knowledge throughout the duration of the course.
          Their hard work and determination have truly paid off,
          and we couldn't be prouder to present them with this certificate of completion!`}</SecondaryText>

          <SecondaryText>{`👏 Let's give ${studentName} a round of applause for their achievement! 👏!`}</SecondaryText>

          <SecondaryText>{`If you're interested in embarking on your own learning journey
           and earning a certificate of completion like ${studentName},
           check out our collection of courses and start your educational adventure today! 💡✨`}</SecondaryText>

          <Box sx={{ width: '100%' }}>
            <Link href={`/courses`}>
              <Button variant="contained" color="success">
                Take me to the courses
              </Button>
            </Link>
          </Box>
        </Box>
      </Row>
    </Section>
  );
};

export default ClaimedBadge;

const SecondaryText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));
