import React from 'react';
import {GitHubIcon, GoogleIcon, LogoIcon} from './index';

export type IconName = 'GitHub' | 'Google' | 'Logo';

type Props = {
  name: IconName;
} & React.SVGProps<SVGSVGElement>;

const Icon: React.FC<Props> = ({ name, ...props }) => {
  switch (name) {
    case 'GitHub':
      return <GitHubIcon {...props} />;
    case 'Google':
      return <GoogleIcon {...props} />;
    case 'Logo':
      return <LogoIcon {...props} />;
  }
};

export default Icon;
