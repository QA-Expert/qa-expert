import { Box } from '@/components/box/box';
import Layout from '@/components/layout/layout';
import { Section, Props as SectionProps } from '@/components/marketing/section';

const SECTIONS: SectionProps[] = [
  {
    background: 'light',
    title: 'what is qaexpert',
    description:
      'Lorem ipsum dolor sit amet consectetur. Gravida vel vulputate amet nec tortor. Malesuada non commodo risus amet enim suspendisse.',
    children: 'TEST',
  },
  {
    background: 'waives',
    title: 'examples',
    description:
      'Lorem ipsum dolor sit amet consectetur. Gravida vel vulputate amet nec tortor. Malesuada non commodo risus amet enim suspendisse.',
    children: 'TEST',
  },
  {
    background: 'light',
    title: 'comparison our platform with others',
    description:
      'Lorem ipsum dolor sit amet consectetur. Gravida vel vulputate amet nec tortor. Malesuada non commodo risus amet enim suspendisse.',
    children: 'TEST',
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
      <Box sx={{ gap: '3rem', height: '100%', width: '100%' }}>
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
