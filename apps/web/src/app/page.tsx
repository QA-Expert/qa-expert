import { Box } from '@/components/box/box';
import Layout from '@/components/layout/layout';
import { Comparison } from '@/components/marketing/comparison/comparison';
import { Examples } from '@/components/marketing/examples/examples';
import { Features } from '@/components/marketing/features/features';
import { Heading } from '@/components/marketing/heading/heading';
import { Section, Props as SectionProps } from '@/components/marketing/section';
import { Subscription } from '@/components/marketing/subscription/subscription';
import { Team } from '@/components/marketing/team/team';
import { useMemo } from 'react';

const HomePage = () => {
  const SECTIONS: SectionProps[] = useMemo(
    () => [
      {
        background: 'light',
        title: 'what is qaexpert',
        description:
          'Lorem ipsum dolor sit amet consectetur. Gravida vel vulputate amet nec tortor. Malesuada non commodo risus amet enim suspendisse.',
        children: <Features />,
        isActive: true,
      },
      {
        background: 'waives',
        title: 'examples',
        description:
          'Lorem ipsum dolor sit amet consectetur. Gravida vel vulputate amet nec tortor. Malesuada non commodo risus amet enim suspendisse.',
        children: <Examples />,
        isActive: true,
      },
      {
        background: 'light',
        title: 'comparison our platform with others',
        description:
          'Lorem ipsum dolor sit amet consectetur. Gravida vel vulputate amet nec tortor. Malesuada non commodo risus amet enim suspendisse.',
        children: <Comparison />,
        isActive: true,
      },
      {
        title: 'reviews',
        description:
          'Lorem ipsum dolor sit amet consectetur. Gravida vel vulputate amet nec tortor. Malesuada non commodo risus amet enim suspendisse.',
        children: 'TEST',
        isActive: false,
      },
      {
        background: 'gradient',
        title: 'subscription',
        description:
          'Lorem ipsum dolor sit amet consectetur. Gravida vel vulputate amet nec tortor. Malesuada non commodo risus amet enim suspendisse.',
        children: <Subscription />,
        isActive: true,
      },
      {
        title: 'meet the team',
        description:
          'Lorem ipsum dolor sit amet consectetur. Gravida vel vulputate amet nec tortor. Malesuada non commodo risus amet enim suspendisse.',
        children: <Team />,
        background: 'waives',
        isActive: true,
      },
    ],
    [],
  );

  return (
    <Layout>
      <Box
        sx={{
          height: '100%',
          width: '100%',
          gap: 0,
        }}
      >
        <Heading />

        {SECTIONS.map((section) => (
          <Section key={section.title} {...section}>
            {section.children}
          </Section>
        ))}
      </Box>
    </Layout>
  );
};

export default HomePage;
