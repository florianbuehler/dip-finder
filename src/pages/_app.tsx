import '../styles/globals.css';
import React from 'react';
import { initializeApp } from 'firebase/app';
import type { AppProps } from 'next/app';
import { Layout } from '../components';
import { firebaseConfig } from '../config/firebase';
import { AuthProvider } from '../providers';

const DipFinder: React.FC<AppProps> = ({ Component, pageProps }) => {
  initializeApp(firebaseConfig);

  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
};

export default DipFinder;
