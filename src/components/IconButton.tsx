import React from 'react';
import { Icon, IconName } from './icons';

type Props = {
  iconName: IconName;
  iconClassName?: string;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const IconButton: React.FC<Props> = ({ iconName, iconClassName, ...props }) => {
  return (
    <div
      {...props}
      className="h-10 w-10 p-2 flex items-center justify-center cursor-pointer hover:bg-sky-500/10 rounded-md"
    >
      <Icon name={iconName} className={`fill-sky-500 ${iconClassName}`} />
    </div>
  );
};

export default IconButton;
