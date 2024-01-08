'use client';

import { Box } from '@/components/box/box';
import Layout from '@/components/layout/layout';
import { Section } from '@/components/section/section';
import { Badges } from '@/components/profile/badges/badges';
import {
  ProfileSidebar,
  Section as SectionName,
} from '@/components/profile/sidebar/sidebar';
import { useState } from 'react';
import Typography from '@mui/material/Typography/Typography';
import Divider from '@mui/material/Divider/Divider';
import { Billing } from '@/components/profile/billing/billing';
import { Activities } from '@/components/profile/activities/activities';
import { Progress } from '@/components/profile/progress/progress';

function Account() {
  const [section, setSection] = useState<SectionName>('badges');

  return (
    <Layout>
      <Box
        sx={{
          flexDirection: 'row',
          width: '100%',
          height: '100%',
          gap: '1rem',
          padding: '1rem',
          flexWrap: 'wrap',
        }}
      >
        <ProfileSidebar onSectionSelect={setSection} />

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

          {section === 'badges' ? <Badges /> : null}
          {section === 'billing' ? <Billing /> : null}
          {section === 'activities' ? <Activities /> : null}
          {section === 'progress' ? <Progress /> : null}
        </Section>
      </Box>
    </Layout>
  );
}

export default Account;
