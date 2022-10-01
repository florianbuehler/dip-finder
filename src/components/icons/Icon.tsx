import React from 'react';
import { GitHubIcon, GoogleIcon, LogoIcon, MoonStarsIcon, SignOutIcon, SunIcon } from './index';

export type IconName = 'github' | 'google' | 'logo' | 'moon-stars' | 'sign-out' | 'sun';

type Props = {
  name: IconName;
} & React.SVGProps<SVGSVGElement>;

const Icon: React.FC<Props> = ({ name, ...props }) => {
  switch (name) {
    case 'github':
      return <GitHubIcon {...props} />;
    case 'google':
      return <GoogleIcon {...props} />;
    case 'logo':
      return <LogoIcon {...props} />;
    case 'moon-stars':
      return <MoonStarsIcon {...props} />;
    case 'sign-out':
      return <SignOutIcon {...props} />;
    case 'sun':
      return <SunIcon {...props} />;
  }
};

export default Icon;
