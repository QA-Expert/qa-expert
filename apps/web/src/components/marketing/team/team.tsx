import {
  CardComponent,
  Props as CardProps,
} from '@/components/marketing/card/card';
import { Row } from '@/components/row/row';

const TEAMMATES: CardProps[] = [
  {
    name: 'Andrei Surzhan',
    title: 'Founder, CEO, Software Engineer and all other things',
    description:
      'Lorem ipsum dolor sit amet consectetur. Gravida vel vulputate amet nec tortor. Malesuada non commodo risus amet enim suspendisse',
    avatar: '/images/andrei-avatar.png',
    socials: [
      {
        name: 'linkedin',
        url: 'https://www.linkedin.com/in/andreisurzhan/',
      },
      {
        name: 'facebook',
        url: 'https://www.facebook.com/andrei.surzhan/',
      },
      {
        name: 'website',
        url: 'https://www.andrei-builds.software/',
      },
    ],
  },
];

export function Team() {
  return (
    <Row sx={{ flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
      {TEAMMATES.map((member) => (
        <CardComponent key={member.name} {...member} />
      ))}
    </Row>
  );
}
