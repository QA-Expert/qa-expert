import { styled } from '@stitches/react';

export const CoursCard = styled('button', {
  // base styles
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: 'none',
  borderRadius: '0.5rem',
  color: '$primaryText',
  padding: '$2',
  fontSize: '$3-5',
  backgroundColor: '$coursCardBackground',
  width: 200,
  height: 200,
  boxShadow: '$botton',

  '&:hover': {
    filter: 'brightness(1.15)',
  },
});
