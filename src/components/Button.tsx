import React from 'react';
import { Icon, IconName } from './icons';

type Props = { icon?: IconName } & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button: React.FC<Props> = ({ icon, className, children, ...props }) => {
  return (
    <button
      className={`flex items-center justify-center border-2 border-sky-500 text-sky-500 rounded-lg py-2 px-3 hover:bg-sky-500/10 ${className}`}
      {...props}
    >
      {icon && <Icon className="w-5 mr-3 fill-sky-600" name={icon} />}
      {children}
    </button>
  );
};

export default Button;
