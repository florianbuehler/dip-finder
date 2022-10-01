import React, { useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks';
import { Icon } from '../icons';
import { IconButton } from '../index';

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
      <div className="flex items-center hover:cursor-pointer" onClick={() => router.push('/')}>
        <Icon name="logo" className="h-7 fill-sky-500" />
        <span className="ml-4 text-xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-sky-700 dark:to-sky-300 select-none">
          Dip Finder
        </span>
      </div>
      <div className="flex items-center gap-1 w-fit h-ful">
        <IconButton
          iconName={darkMode ? 'moon-stars' : 'sun'}
          iconClassName={darkMode ? 'mb-1' : ''}
          onClick={handleThemeToggle}
        />
        {user && (
          <IconButton iconName="sign-out" iconClassName="scale-90" onClick={handleSignOut} />
        )}
      </div>
    </header>
  );
};

export default Header;
