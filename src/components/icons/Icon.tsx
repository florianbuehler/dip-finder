import React from 'react';
import { GitHubIcon, GoogleIcon } from './index';

export type IconName = 'GitHub' | 'Google';

type Props = {
  name: IconName;
} & React.SVGProps<SVGSVGElement>;

const Icon: React.FC<Props> = ({ name, ...props }) => {
  switch (name) {
    case 'GitHub':
      return <GitHubIcon {...props} />;
    case 'Google':
      return <GoogleIcon {...props} />;
  }
};

export default Icon;
