import React, {useState} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider, signInWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth';
// import {app} from '../config/firebase';
import {useRouter} from 'next/router';
import {useAuth} from '../hooks';

const Login: React.FC = () => {
  const auth = getAuth();
  const googleAuthProvider = new GoogleAuthProvider();
  const gitHubAuthProvider = new GithubAuthProvider();
  const router = useRouter();
  const { user } = useAuth();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // useEffect(() => {
  //   const token = sessionStorage.getItem('Token')
  //
  //   if (token) {
  //     router.push('/')
  //   }
  // }, [])

  console.log('login - currentUser:', user)



  const signUpWithEmail = async () => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    console.log('email - logged in user credential:', userCredential)

    sessionStorage.setItem('Token', userCredential.user.accessToken)

    await router.push("/")
  }

  const signInWithGoogle = async () => {
    const userCredential = await signInWithPopup(auth, googleAuthProvider)

    console.log('google - logged in user credential:', userCredential)
    sessionStorage.setItem('Token', userCredential.user.accessToken)

    await router.push("/")
  }

  const signInWithGitHub = async () => {
    const userCredential = await signInWithPopup(auth, gitHubAuthProvider)

    console.log('github - logged in user credential:', userCredential)
    sessionStorage.setItem('Token', userCredential.user.accessToken)

    await router.push("/")
  }

  return (
    <div>
      <Head>
        <title>Login</title>

        <meta name="description" content="Register page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Login</h1>
        <input type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
        <button onClick={signUpWithEmail}>Sign Up</button>
        <Link href="/login">login</Link>

        <button onClick={signInWithGoogle}>Google</button>
        <button onClick={signInWithGitHub}>GitHub</button>
      </main>
    </div>
  );
};

export default Login;
