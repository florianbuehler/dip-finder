import '../styles/globals.css';
import type { AppProps } from 'next/app';
import {initializeApp} from 'firebase/app';
import {firebaseConfig} from '../config/firebase';
import {AuthProvider} from '../providers';

function MyApp({ Component, pageProps }: AppProps) {
  initializeApp(firebaseConfig);

  return <AuthProvider><Component {...pageProps} /></AuthProvider>;
}

export default MyApp;
