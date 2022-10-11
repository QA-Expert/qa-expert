import { styled } from '@stitches/react';
import { hue, lightness, saturation } from '../../../stitches.config';

export const Button = styled('button', {
  // base styles
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: 'none',
  borderRadius: '0.25rem',
  color: 'white',
  padding: '$2',
  fontSize: '$2',

  '&:disabled': {
    backgroundColor: '$disabled',
    color: '$disabledText',
    '&:hover': {
      backgroundColor: '$disabled',
    },
  },

  variants: {
    size: {
      sm: {
        fontSize: '$2',
        height: '25px',
        paddingRight: '10px',
        paddingLeft: '10px',
      },
      lg: {
        fontSize: '$3',
        height: '35px',
        paddingLeft: '15px',
        paddingRight: '15px',
      },
    },
    bg: {
      primary: {
        backgroundColor: `hsl(${hue} ${saturation} ${lightness})`,
        '&:hover': {
          backgroundColor: `hsl(${hue} ${saturation} 70%)`,
        },
      },
      secondary: {
        backgroundColor: '#009688',
        '&:hover': {
          backgroundColor: '#4db6ac',
        },
      },
      danger: {
        backgroundColor: '#f44336',
        '&:hover': {
          backgroundColor: '#ef9a9a',
        },
      },
      success: {
        backgroundColor: '#4caf50',
        color: 'white',
        '&:hover': {
          backgroundColor: '#a5d6a7',
        },
      },
    },
    position: {
      left: {
        marginLeft: 'auto',
      },
    },
  },
});
