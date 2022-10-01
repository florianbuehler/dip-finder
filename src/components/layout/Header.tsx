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
    <header className="flex items-center justify-between h-14 bg-white dark:bg-slate-600/25 shadow-lg px-5">
      <Icon name="logo" className="h-7 fill-sky-500" />
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
