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
    } else {
      localStorage.theme = 'dark';
    }

    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  return (
    <header className="flex items-center h-12 bg-red-500">
      <Icon
        name={darkMode ? 'moon-stars' : 'sun'}
        onClick={handleThemeToggle}
        className="h-6 cursor-pointer"
      />
    </header>
  );
};

export default Header;
