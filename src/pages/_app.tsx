import '../styles/globals.css';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { initializeApp } from 'firebase/app';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { Layout } from '../components';
import { firebaseConfig } from '../config/firebase';
import { AuthProvider, ThemeProvider } from '../providers';

const queryClient = new QueryClient();

const DipFinder: React.FC<AppProps> = ({ Component, pageProps }) => {
  initializeApp(firebaseConfig);

  return (
    <>
      <Head>
        <title>Dip Finder</title>
        <link rel="icon" type="image/svg+xml" href="/logo.svg" sizes="any" />
      </Head>
      <Script id="theme">
        {`
          if (
            localStorage.theme === 'dark' ||
            (!('theme' in localStorage) &&
              window.matchMedia('(prefers-color-scheme: dark)').matches)
          ) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        `}
      </Script>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
            <ReactQueryDevtools initialIsOpen={false} />
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
};

export default DipFinder;
