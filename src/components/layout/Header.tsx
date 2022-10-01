import React, { useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks';
import { Icon } from '../icons';

const Header: React.FC = () => {
  const auth = getAuth();
  const { user } = useAuth();
  const router = useRouter();

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

  const handleSignOut = () => {
    void signOut(auth);
    void router.push('/login');
  };

  return (
    <header className="flex items-center justify-between h-16 bg-white dark:bg-transparent dark:ring-1 dark:ring-slate-100/10 shadow-md shadow-slate-900/5 px-5">
      <div className="flex items-center">
        <Icon name="logo" className="h-7 fill-sky-500" />
        <span className="ml-4 text-xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-sky-700 dark:to-sky-300">Dip Finder</span>
      </div>
      <div className="flex items-center gap-5 w-fit h-full">
        <Icon
          name={darkMode ? 'moon-stars' : 'sun'}
          onClick={handleThemeToggle}
          className="h-6 fill-sky-500 cursor-pointer dark:mb-1"
        />
        {user && (
          <Icon
            name="sign-out"
            className="h-5 fill-sky-500 cursor-pointer"
            onClick={handleSignOut}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
