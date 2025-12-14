import { ThemeConfig, THEMES } from './themes';

export * from './themes';

// Fallback logic
export const getThemeStyles = (themeName: string, mode: 'light' | 'dark'): ThemeConfig => {
  const normalized = themeName?.toLowerCase().replace(/[\s-]/g, '_');
  const theme = THEMES[normalized] || THEMES.default;
  return mode === 'light' ? theme.day : theme.night;
};
