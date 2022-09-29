import { useState } from 'react';
import { theme as defaultTheme, darkTheme } from '../../../stitches.config';

export interface ThemeMap {
  light: typeof defaultTheme.className | null;
  dark: typeof darkTheme.className | null;
}

export const useTheme = () => {
  const defaultThemeMap: ThemeMap = {
    light: defaultTheme.className,
    dark: null,
  };
  const [theme, setTheme] = useState<ThemeMap>(defaultThemeMap);

  const toggleTheme = () => {
    const currentThemName = getThemeName(theme);
    let newTheme: ThemeMap;

    if (currentThemName === 'light') {
      newTheme = { dark: darkTheme.className, light: null };
      document.documentElement.classList.remove(theme[currentThemName] ?? '');
      document.documentElement.classList.add(darkTheme.className);
    } else {
      newTheme = { light: defaultTheme.className, dark: null };
      document.documentElement.classList.remove(theme[currentThemName] ?? '');
      document.documentElement.classList.add(defaultTheme.className);
    }

    setTheme(newTheme);
  };

  return { themName: getThemeName(theme), toggleTheme };
};

const getThemeName = (themeMap: ThemeMap): keyof ThemeMap => {
  for (const name in themeMap) {
    const key = name as keyof ThemeMap;

    if (themeMap[key]) {
      return key;
    }
  }

  return 'light';
};
