import React, { useEffect, useState } from 'react';
import { Icon } from '../icons';

const Header: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>();

  useEffect(() => {
    setDarkMode(
      localStorage.theme === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
  }, []);

  const handleThemeToggle = () => {
    if (darkMode) {
      localStorage.theme = 'light';
      document.documentElement.classList.remove('dark');
    } else {
      localStorage.theme = 'dark';
      document.documentElement.classList.add('dark');
    }

    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  return (
    <header className="flex items-center justify-between h-14 bg-white dark:bg-slate-800 shadow-lg px-4">
      <Icon name="logo" className="h-7 fill-sky-500" />
      <Icon
        name={darkMode ? 'moon-stars' : 'sun'}
        onClick={handleThemeToggle}
        className="h-6 fill-sky-500 cursor-pointer"
      />
    </header>
  );
};

export default Header;
