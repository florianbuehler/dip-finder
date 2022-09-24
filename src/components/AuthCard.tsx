import React from 'react';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Image from 'next/image';
import { useRouter } from 'next/router';
import investing from '../assets/undraw_investing.svg';
import { Icon } from './icons';
import { Button } from './index';

type Props = { title: string; children: React.ReactNode };

const AuthCard: React.FC<Props> = ({ title, children }) => {
  const auth = getAuth();
  const googleAuthProvider = new GoogleAuthProvider();
  const gitHubAuthProvider = new GithubAuthProvider();
  const router = useRouter();

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleAuthProvider);
    await router.push('/');
  };

  const signInWithGitHub = async () => {
    await signInWithPopup(auth, gitHubAuthProvider);
    await router.push('/');
  };

  return (
    <section className="self-center m-auto bg-white px-12 py-10 rounded-xl shadow-xl">
      <h1 className="text-3xl font-semibold text-center mb-8">{title}</h1>
      <div className="flex gap-16 items-center m-auto">
        <div className="relative w-80 h-60">
          <Image
            src={investing}
            alt="Investing"
            layout="fill"
            objectFit="contain"
            width="100%"
            height="100%"
          />
        </div>
        <div className="flex flex-col w-72">
          {children}
          <div className="mt-8">
            <div className="flex items-center mb-3">
              <div className="flex-grow bg-slate-300 h-0.5" />
              <p className="text-slate-500 px-2">Or continue with</p>
              <div className="flex-grow bg-slate-300 h-0.5" />
            </div>
            <div className="flex self-center gap-4">
              <Button className="flex-grow" icon="Google" onClick={signInWithGoogle}>
                Google
              </Button>
              <Button className="flex-grow" icon="GitHub" onClick={signInWithGitHub}>
                GitHub
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthCard;
