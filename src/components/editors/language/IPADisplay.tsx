import React from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const IPADisplay = ({ children, className }: Props) => {
  return (
    <div
      className={`py-2 px-4 bg-gray-200 rounded shadow-inner font-serif ${className}`}
    >
      {children}
    </div>
  );
};

export default IPADisplay;
