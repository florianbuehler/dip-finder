import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import investments from '../assets/undraw_investments.svg';
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
        <title>Register | Dip Finder</title>

        <meta name="description" content="Register page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthCard title="Register" image={investments}>
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
        <Button onClick={signUpWithEmail} className="mb-3">
          Sign Up
        </Button>
        <div className="flex text-sm">
          <p>Already have an account?</p>
          <span className="ml-1 text-emerald-600">
            <Link href="/login">Go to Login.</Link>
          </span>
        </div>
      </AuthCard>
    </>
  );
};

export default Register;
