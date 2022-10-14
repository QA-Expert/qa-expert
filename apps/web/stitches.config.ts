import { createStitches } from '@stitches/react';

// Base color values
export const hue = '200';
export const saturation = '100%';
export const lightness = '50%';

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      header: `hsl(${hue} ${saturation} ${lightness})`,
      primaryText: `hsl(${hue} ${saturation} 10%)`,
      secondaryText: `hsl(${hue} 30% 30%)`,
      background: `hsl(${hue} 20% 99%)`,
      navBackground: `hsl(${hue} 20% 92%)`,
      footerBackground: `hsl(${hue} ${saturation} ${lightness})`,
      sidebarBackground: `hsl(${hue} 25% 90%)`,
      coursCardBackground: `hsl(${hue} 25% 90%)`,
      border: `hsl(${hue} 10% 70%)`,
      disabled: `hsl(${hue} 15% 85%)`,
      disabledText: `hsl(${hue} 10% 60%)`,
      errorMessage: 'red',
    },
    sizes: {
      1: '0.0625rem', // 1px
      2: '0.125rem', // 2px
      3: '0.25rem', // 4px
      4: '0.5rem', // 8px,
      5: '0.75rem', // 12px,
      6: '1rem', // 16px,
      '6-2': '1.5rem', // 24px,
      7: '2rem', // 32px
      8: '3rem', // 48px
      9: '4rem', // 64px
    },
    space: {
      1: '0.25rem', // 4px
      '1-2': '0.375rem', // 6px
      2: '0.5rem', // 8px
      3: '1rem', // 16px
      4: '2rem', // 32px
      5: '3rem', // 48px
      6: '4rem', // 64px
      30: '30rem', // 480px
    },
    fontSizes: {
      '0-1': '0.675rem', // 10px
      1: '0.75rem', // 12px
      2: '0.875rem', // 14px
      3: '1rem', // 16px
      '3-5': '1.5rem', // 24px
      4: '2rem', // 32px
      '4-5': '2.5rem', // 40px
      5: '3rem', // 48px
      6: '4rem', // 64px
    },
    shadows: {
      color: `hsl(${hue} 10% 70%)`,
      around: `0 0 3px 3px $color`,
      botton: `1px 1px 2px 2px $color`,
    },
    zIndices: {
      navbar: 1,
      sidebar: 2,
    },
    borderWidths: {
      sm: '1px',
    },
    borderStyles: {},
    radii: {
      1: '0.0625rem', // 1px
      2: '0.125rem', // 2px
      3: '0.25rem', // 4px
      4: '0.5rem', // 8px,
      5: '0.75rem', // 12px,
      6: '1rem', // 16px,
    },
  },
  media: {
    bp1: '(min-width: 640px)',
    bp2: '(min-width: 768px)',
    bp3: '(min-width: 1024px)',
  },
  utils: {
    size: (value: string | number) => ({
      width: value,
      height: value,
    }),
  },
});

export const darkTheme = createTheme({
  colors: {
    header: `hsl(${hue} calc(${saturation})/2 calc(${lightness})/1.5)`,
    primaryText: `hsl(${hue} 15% 85%)`,
    secondaryText: `hsl(${hue} 5% 65%)`,
    background: `hsl(${hue} 10% 15%)`,
    navBackground: `hsl(${hue} 5% 25%)`,
    footerBackground: `hsl(${hue} 5%  20%)`,
    sidebarBackground: `hsl(${hue} 5% 25%)`,
    coursCardBackground: `hsl(${hue} 5% 25%)`,
  },
  shadows: {
    color: `hsl(${hue} 10% 10%)`,
  },
});
