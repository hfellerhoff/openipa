import React from 'react';

type Props = {
  children: React.ReactNode;
};

export default function Blockquote({ children }: Props) {
  return (
    <blockquote className='p-4 my-4 italic bg-gray-200 border-l-2 border-gray-400 rounded rounded-l-none'>
      {children}
    </blockquote>
  );
}
