import React from 'react';

interface Props {
  children: React.ReactNode;
}

const IPADisplay = ({ children }: Props) => {
  return (
    <div className='py-2 px-4 bg-gray-200 rounded shadow-inner font-serif'>
      {children}
    </div>
  );
};

export default IPADisplay;
