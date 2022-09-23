import '../styles/globals.css';
import { initializeApp } from 'firebase/app';
import type { AppProps } from 'next/app';
import { Layout } from '../components';
import { firebaseConfig } from '../config/firebase';
import { AuthProvider } from '../providers';

function MyApp({ Component, pageProps }: AppProps) {
  initializeApp(firebaseConfig);

  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
