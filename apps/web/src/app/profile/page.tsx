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
import { Skeletons } from '@/components/skeleton/skeleton';
import { Row } from '@/components/row/row';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useTheme } from '@mui/material/styles';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY ?? '',
);

function Account() {
  const [section, setSection] = useState<SectionName>('badges');
  const theme = useTheme();
  return (
    <Elements
      stripe={stripePromise}
      options={{
        appearance: {
          rules: {
            '.Label': {
              color: theme.palette.secondary.main,
            },
            '.Input,': {
              borderColor: theme.palette.secondary.main,
            },
          },
          variables: {
            colorPrimary: theme.palette.secondary.main,
            colorBackground: theme.palette.primary.main,
            colorText: theme.palette.text.primary,
            colorDanger: theme.palette.error.main,
            fontFamily: theme.typography.fontFamily,
            colorTextSecondary: theme.palette.text.secondary,
            colorTextPlaceholder: theme.palette.secondary.light,
            colorSuccess: theme.palette.success.main,
            colorWarning: theme.palette.warning.main,
            focusBoxShadow: theme.palette.secondary.dark,
            focusOutline: theme.palette.secondary.dark,
            spacingUnit: '4px',
            borderRadius: '4px',
            gridRowSpacing: '1rem',
            gridColumnSpacing: '1rem',
          },
        },
      }}
    >
      <Suspense fallback={<Skeletons sx={{ flex: 1, height: '100%' }} />}>
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
              fallback={<Skeletons width={300} height={300} quantity={20} />}
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
    </Elements>
  );
}

export default Account;
