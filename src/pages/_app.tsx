import '../styles/globals.css';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { initializeApp } from 'firebase/app';
import type { AppProps } from 'next/app';
import { Layout } from '../components';
import { firebaseConfig } from '../config/firebase';
import { AuthProvider } from '../providers';

const queryClient = new QueryClient();

const DipFinder: React.FC<AppProps> = ({ Component, pageProps }) => {
  initializeApp(firebaseConfig);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ReactQueryDevtools initialIsOpen={false} />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default DipFinder;
