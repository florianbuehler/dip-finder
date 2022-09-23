import React from 'react';

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button: React.FC<Props> = ({ className, children, ...props }) => {
  return (
    <button className={`bg-amber-500 rounded-lg py-2 px-2.5 ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
