import React from 'react';

type Props = {
  children?: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return <main className="h-screen flex bg-slate-100">{children}</main>;
};

export default Layout;
