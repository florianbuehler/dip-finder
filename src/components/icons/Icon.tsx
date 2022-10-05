import React from 'react';
import {
  ArrowTrendDownIcon,
  ArrowTrendUpIcon,
  CancelIcon,
  FloppyDiskIcon,
  GitHubIcon,
  GoogleIcon,
  LogoIcon,
  MoonStarsIcon,
  PlusIcon,
  SignOutIcon,
  SunIcon,
  TrashCanIcon
} from './index';

export type IconName =
  | 'arrow-trend-down'
  | 'arrow-trend-up'
  | 'cancel'
  | 'floppy-disk'
  | 'github'
  | 'google'
  | 'logo'
  | 'moon-stars'
  | 'plus'
  | 'sign-out'
  | 'sun'
  | 'trash-can';

type Props = {
  name: IconName;
} & React.SVGProps<SVGSVGElement>;

const Icon: React.FC<Props> = ({ name, ...props }) => {
  switch (name) {
    case 'arrow-trend-down':
      return <ArrowTrendDownIcon {...props} />;
    case 'cancel':
      return <CancelIcon {...props} />;
    case 'floppy-disk':
      return <FloppyDiskIcon {...props} />;
    case 'arrow-trend-up':
      return <ArrowTrendUpIcon {...props} />;
    case 'github':
      return <GitHubIcon {...props} />;
    case 'google':
      return <GoogleIcon {...props} />;
    case 'logo':
      return <LogoIcon {...props} />;
    case 'moon-stars':
      return <MoonStarsIcon {...props} />;
    case 'plus':
      return <PlusIcon {...props} />;
    case 'sign-out':
      return <SignOutIcon {...props} />;
    case 'sun':
      return <SunIcon {...props} />;
    case 'trash-can':
      return <TrashCanIcon {...props} />;
  }
};

export default Icon;
