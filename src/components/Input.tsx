import React from 'react';

type Props = { label: string } & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: React.FC<Props> = ({ label, className, ...props }) => {
  return (
    <div className={`relative z-0 mb-7 ${className}`}>
      <input
        {...props}
        className="block py-2.5 px-0 w-full text-base bg-transparent border-0 border-b-2 border-slate-300 appearance-none dark:text-white dark:border-slate-600 dark:focus:border-sky-500 focus:outline-none focus:ring-0 focus:border-sky-500 peer"
        placeholder=" "
      />
      <label
        htmlFor={props.id}
        className="absolute text-base duration-300 transform -translate-y-7 scale-90 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-sky-500 peer-focus:dark:text-sky-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-7"
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
