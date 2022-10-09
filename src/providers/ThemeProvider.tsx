import { ReactNode, useEffect, useState } from 'react';
import ThemeContext from '../context/ThemeContext';

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme: theme,
        isDarkTheme: theme === 'dark',
        onThemeToggle: (theme) => setTheme(theme)
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
