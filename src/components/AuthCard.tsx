import React from 'react';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button } from './index';

type Props = { title: string; image: string; children: React.ReactNode };

const AuthCard: React.FC<Props> = ({ title, image, children }) => {
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
    <section className="self-center m-auto bg-white dark:bg-slate-800 px-12 pt-10 pb-12 rounded-xl shadow-lg">
      <h1 className="text-3xl font-semibold text-center mb-10 text-slate-900 dark:text-slate-200">{title}</h1>
      <div className="flex gap-16 items-center m-auto">
        <div className="relative w-80 h-60">
          <Image
            src={image}
            alt="Investing"
            layout="fill"
            objectFit="contain"
            width="100%"
            height="100%"
          />
        </div>
        <div className="flex flex-col w-72">
          {children}
          <div className="mt-9">
            <div className="flex items-center mb-3">
              <div className="flex-grow h-0.5 bg-slate-300 dark:bg-slate-600" />
              <p className="px-2">Or continue with</p>
              <div className="flex-grow h-0.5 bg-slate-300 dark:bg-slate-600" />
            </div>
            <div className="flex self-center gap-4">
              <Button className="flex-grow" icon="google" onClick={signInWithGoogle}>
                Google
              </Button>
              <Button className="flex-grow" icon="github" onClick={signInWithGitHub}>
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
