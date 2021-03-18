import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  colorScheme?: 'primary' | 'grayscale' | 'error' | 'warning';
  variant?: 'button' | 'wide';
}

const Button = ({
  colorScheme = 'primary',
  variant = 'button',
  className,
  ...rest
}: Props) => {
  const color =
    colorScheme === 'primary'
      ? 'blue'
      : colorScheme === 'error'
      ? 'red'
      : colorScheme === 'warning'
      ? 'yellow'
      : 'gray';

  return (
    <button
      className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-${color}-600 hover:bg-${color}-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${color}-500 ${
        variant === 'wide' ? 'w-full justify-center' : ''
      } ${className}`}
      {...rest}
    ></button>
  );
};

export default Button;
