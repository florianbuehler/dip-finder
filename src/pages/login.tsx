import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import investing from '../assets/undraw_investing.svg';
import { AuthCard, Button, Input } from '../components';

const Login: React.FC = () => {
  const auth = getAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUpWithEmail = async () => {
    await signInWithEmailAndPassword(auth, email, password);
    await router.push('/');
  };

  return (
    <>
      <Head>
        <title>Login | Dip Finder </title>

        <meta name="description" content="Login page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthCard title="Login" image={investing}>
        <Input
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={signUpWithEmail} className="mt-1 mb-3">
          Sign In
        </Button>
        <div className="flex text-sm">
          <p>No account yet?</p>
          <span className="ml-1 text-emerald-600">
            <Link href="/register">Register for free.</Link>
          </span>
        </div>
      </AuthCard>
    </>
  );
};

export default Login;
