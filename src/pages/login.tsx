import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
        <title>Login</title>

        <meta name="description" content="Register page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthCard title="Login">
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
        <Button onClick={signUpWithEmail} className="bg-red-500 mb-3">
          Sign Up
        </Button>
        <div className="flex text-sm">
          <p>No account yet? Simply</p>
          <span className="ml-1 text-red-600">
            <Link href="/register">Register</Link>
          </span>
        </div>
      </AuthCard>
    </>
  );
};

export default Login;
