'use client';

import { Section } from '@/components/section/section';
import { Badges } from '@/components/profile/badges/badges';
import {
  ProfileSidebar,
  Section as SectionName,
} from '@/components/profile/sidebar/sidebar';
import { Suspense, useState } from 'react';
import Typography from '@mui/material/Typography/Typography';
import Divider from '@mui/material/Divider/Divider';
import { Billing } from '@/components/profile/billing/billing';
import { Activities } from '@/components/profile/activities/activities';
import { Progress } from '@/components/profile/progress/progress';
import Skeleton from '@mui/material/Skeleton/Skeleton';
import { Skeletons } from '@/components/skeleton/skeleton';
import { Row } from '@/components/row/row';

function Account() {
  const [section, setSection] = useState<SectionName>('badges');

  return (
    <>
      <Suspense fallback={<Skeleton sx={{ flex: 1, height: '100%' }} />}>
        <ProfileSidebar onSectionSelect={setSection} />
      </Suspense>

      <Section
        sx={{
          flex: 3.5,
          padding: '2rem',
          gap: '1.5rem',
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: '2rem',
            textTransform: 'uppercase',
            color: 'secondary.main',
          }}
        >
          {section}
        </Typography>

        <Divider
          variant="fullWidth"
          sx={{ backgroundColor: 'warning.main' }}
          light
          flexItem
        />

        <Row
          sx={{
            width: '100%',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1rem',
          }}
        >
          {section === 'badges' ? (
            <Suspense
              fallback={<Skeletons width={200} height={200} quantity={20} />}
            >
              <Badges />
            </Suspense>
          ) : null}

          {section === 'progress' ? (
            <Suspense
              fallback={<Skeletons width={'100%'} height={110} quantity={8} />}
            >
              <Progress />
            </Suspense>
          ) : null}

          {section === 'activities' ? (
            <Suspense
              fallback={<Skeletons width={510} height={155} quantity={8} />}
            >
              <Activities />
            </Suspense>
          ) : null}

          {section === 'billing' ? (
            <Suspense fallback={'...Loading'}>
              <Billing />
            </Suspense>
          ) : null}
        </Row>
      </Section>
    </>
  );
}

export default Account;
