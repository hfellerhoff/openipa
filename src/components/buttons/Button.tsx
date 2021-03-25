import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  colorScheme?: 'primary' | 'grayscale' | 'error' | 'warning';
  variant?: 'button' | 'wide';
  colorClassName?: string;
  color?: string;
}

const Button = ({
  variant = 'button',
  className,
  colorClassName,
  color,
  ...rest
}: Props) => {
  return (
    <button
      className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
        colorClassName || 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-700'
      } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        variant === 'wide' ? 'w-full justify-center' : ''
      } ${className}`}
      {...rest}
    ></button>
  );
};

export default Button;
