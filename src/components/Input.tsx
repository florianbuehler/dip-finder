import React from 'react';

type Props = { label: string } & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: React.FC<Props> = ({ label, ...props }) => {
  return (
    // <div className="mb-4">
    //   {label && (
    //     <label className="block mb-1.5 text-base font-medium text-slate-900 dark:text-slate-300">
    //       {label}
    //     </label>
    //   )}
    //   <input
    //     {...props}
    //     className="bg-white border border-slate-300 text-slate-900 text-base rounded-lg focus:ring-slate-300 focus:border-slate-300 w-full py-2 px-2.5"
    //   />
    // </div>
    <div className="relative z-0 mb-7">
      <input
        {...props}
        className="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
        placeholder=" "
      />
      <label
        htmlFor={props.id}
        className="absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-90 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-7"
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
