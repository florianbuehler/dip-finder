import React from 'react';
import { Icon, IconName } from './icons';

type Props = {
  iconName: IconName;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const IconButton: React.FC<Props> = ({ iconName, className, ...props }) => {
  return (
    <div
      {...props}
      className={`h-10 w-10 p-2 flex items-center justify-center cursor-pointer fill-sky-500 hover:bg-sky-500/10 rounded-md ${className}`}
    >
      <Icon name={iconName} className="h-full" />
    </div>
  );
};

export default IconButton;
