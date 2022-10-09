import React from 'react';
import { twMerge } from 'tailwind-merge';
import { Icon, IconName } from './icons';

type Props = {
  iconName: IconName;
  iconClassName?: string;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const IconButton: React.FC<Props> = ({ iconName, iconClassName, className, ...props }) => {
  return (
    <div
      {...props}
      className={twMerge(
        'h-5 w-5 m-1.5 flex items-center justify-center cursor-pointer fill-sky-600 hover:fill-sky-400',
        className
      )}
    >
      <Icon name={iconName} className={twMerge('h-full', iconClassName)} />
    </div>
  );
};

export default IconButton;
