import React from 'react';
import { Icon, IconName } from './icons';

type Props = { icon?: IconName } & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button: React.FC<Props> = ({ icon, className, children, ...props }) => {
  return (
    <button
      className={`flex items-center justify-center border-2 border-emerald-600 text-emerald-600 rounded-lg py-2 px-2.5 hover:bg-emerald-50 ${className}`}
      {...props}
    >
      {icon && <Icon className="w-5 mr-3 fill-emerald-600" name={icon} />}
      {children}
    </button>
  );
};

export default Button;
