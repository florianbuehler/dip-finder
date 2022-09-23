import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AuthCard, Button, Input } from '../components';

const Register: React.FC = () => {
  const auth = getAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUpWithEmail = async () => {
    await createUserWithEmailAndPassword(auth, email, password);
    await router.push('/');
  };

  return (
    <>
      <Head>
        <title>Register</title>

        <meta name="description" content="Register page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthCard title="Register">
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
        <Button onClick={signUpWithEmail}>Sign Up</Button>
        <Link href="/login">login</Link>
      </AuthCard>
    </>
  );
};

export default Register;
