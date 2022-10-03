import React from 'react';
import Header from './Header';

type Props = {
  children?: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="flex flex-grow p-6 gap-6">{children}</main>
    </>
  );
};

export default Layout;
