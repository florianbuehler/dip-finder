import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';

const Document: React.FC = () => {
  return (
    <Html>
      <Head />
      <body className="text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
