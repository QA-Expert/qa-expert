'use client';

import { Box } from '@/components/box/box';
import Layout from '@/components/layout/layout';
import { Section } from '@/components/section/section';
import { Badges } from '@/components/profile/badges/badges';
import { ProfileSidebar } from '@/components/profile/sidebar/sidebar';

function Account() {
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
        <ProfileSidebar />

        <Section
          sx={{
            flex: 3.5,
            padding: '2rem',
            gap: '1rem',
          }}
        >
          <Badges />
        </Section>
      </Box>
    </Layout>
  );
}

export default Account;
