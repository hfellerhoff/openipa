import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { AnchorHTMLAttributes } from 'react';

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
type AnchorProps = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

type ElementProps = ButtonProps & AnchorProps;

interface Props extends ElementProps {
  colorScheme?: 'primary' | 'grayscale' | 'error' | 'warning';
  variant?: 'button' | 'wide';
  colorClassName?: string;
  color?: string;
  href?: string;
}

const Button = ({
  variant = 'button',
  className,
  colorClassName,
  href,
  ...rest
}: Props) => {
  const Component = href ? 'a' : 'button';
  return (
    <Component
      href={href}
      className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
        colorClassName || 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-700'
      } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        variant === 'wide' ? 'w-full justify-center' : ''
      } ${className}`}
      {...rest}
    ></Component>
  );
};

export default Button;
