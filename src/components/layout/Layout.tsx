import React from 'react';
import Header from './Header';

type Props = {
  children?: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="h-screen flex bg-slate-100">{children}</main>;
    </>
  );
};

export default Layout;
