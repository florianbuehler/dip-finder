import React from 'react';
import { Icon, IconName } from './icons';

type Props = { icon?: IconName } & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button: React.FC<Props> = ({ icon, className, children, ...props }) => {
  return (
    <button
      className={`flex items-center justify-center border-2 border-red-600 text-red-600 rounded-lg py-2 px-2.5 hover:bg-red-100 ${className}`}
      {...props}
    >
      {icon && <Icon className="w-5 mr-3 fill-red-500" name={icon} />}
      {children}
    </button>
  );
};

export default Button;
