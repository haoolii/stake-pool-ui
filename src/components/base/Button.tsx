import React, { ReactElement } from 'react';

export const tuple = <T extends string[]>(...args: T) => args;

const ButtonTypes = tuple('default', 'primary', 'icon');

interface Props {
  type?: typeof ButtonTypes[number];
  className?: string;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLElement>;
  disabled?: boolean;
}

const Button = ({
  type = 'default',
  children,
  onClick,
  className,
  disabled
}: Props): ReactElement => {
  const primaryClasses =
    'bg-slate-400 hover:bg-slate-500 focus:outline-none focus:ring focus:ring-slate-400 active:bg-slate-600 px-4 py-3 text-sm leading-5 rounded-md font-semibold text-white disabled:cursor-not-allowed';
  const defaultClasses =
    'bg-slate-200 focus:outline-none px-4 py-3 text-sm leading-5 focus:ring focus:ring-slate-300 rounded-md font-semibold text-slate-600 hover:bg-slate-300 active:bg-slate-400 disabled:cursor-not-allowed';
  const iconClasses = `p-1.5 rounded-full transition hover:bg-slate-100 disabled:cursor-not-allowed`;

  let classes = defaultClasses;

  if (type === 'primary') {
    classes = primaryClasses
  }
  if (type === 'icon') {
    classes = iconClasses;
  }

  return <button disabled={disabled} onClick={onClick} className={`${classes} ${className}`}>{children}</button>;
};

export default Button;
