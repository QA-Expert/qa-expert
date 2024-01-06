import { Box } from '@/components/box/box';
import Layout from '@/components/layout/layout';
import { Comparison } from '@/components/marketing/comparison/comparison';
import { Examples } from '@/components/marketing/examples/examples';
import { Features } from '@/components/marketing/features/features';
import { Section, Props as SectionProps } from '@/components/marketing/section';

const SECTIONS: SectionProps[] = [
  {
    background: 'light',
    title: 'what is qaexpert',
    description:
      'Lorem ipsum dolor sit amet consectetur. Gravida vel vulputate amet nec tortor. Malesuada non commodo risus amet enim suspendisse.',
    children: <Features />,
  },
  {
    background: 'waives',
    title: 'examples',
    description:
      'Lorem ipsum dolor sit amet consectetur. Gravida vel vulputate amet nec tortor. Malesuada non commodo risus amet enim suspendisse.',
    children: <Examples />,
  },
  {
    background: 'light',
    title: 'comparison our platform with others',
    description:
      'Lorem ipsum dolor sit amet consectetur. Gravida vel vulputate amet nec tortor. Malesuada non commodo risus amet enim suspendisse.',
    children: <Comparison />,
  },
  {
    title: 'reviews',
    description:
      'Lorem ipsum dolor sit amet consectetur. Gravida vel vulputate amet nec tortor. Malesuada non commodo risus amet enim suspendisse.',
    children: 'TEST',
  },
  {
    background: 'gradient',
    title: 'subscription',
    description:
      'Lorem ipsum dolor sit amet consectetur. Gravida vel vulputate amet nec tortor. Malesuada non commodo risus amet enim suspendisse.',
    children: 'TEST',
  },
  {
    title: 'meet the team',
    description:
      'Lorem ipsum dolor sit amet consectetur. Gravida vel vulputate amet nec tortor. Malesuada non commodo risus amet enim suspendisse.',
    children: 'TEST',
  },
] as const;

const HomePage = () => {
  return (
    <Layout>
      <Box sx={{ height: '100%', width: '100%' }}>
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
