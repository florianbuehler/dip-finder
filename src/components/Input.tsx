import React from 'react';

type Props = { label?: string } & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: React.FC<Props> = ({ label, ...props }) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block mb-1.5 text-base font-medium text-slate-900 dark:text-slate-300">
          {label}
        </label>
      )}
      <input
        {...props}
        className="bg-white border border-slate-300 text-slate-900 text-base rounded-lg focus:ring-slate-300 focus:border-slate-300 w-full py-2 px-2.5"
      />
    </div>
  );
};

export default Input;
