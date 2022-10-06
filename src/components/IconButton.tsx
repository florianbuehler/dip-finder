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
        'h-10 w-10 p-2 flex items-center justify-center cursor-pointer fill-sky-500 hover:bg-sky-500/10 rounded-md',
        className
      )}
    >
      <Icon name={iconName} className={twMerge('h-full', iconClassName)} />
    </div>
  );
};

export default IconButton;
