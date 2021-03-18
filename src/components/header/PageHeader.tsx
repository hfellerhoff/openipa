import React from 'react';

interface Props {
  title: string;
  subtitle: string;
  colorClassName: string;
}

const PageHeader = ({ title, subtitle, colorClassName }: Props) => {
  return (
    <div
      className={`w-full ${colorClassName} py-16 flex flex-col align-center justify-center px-4`}
    >
      <div className='max-w-xl mx-auto text-center'>
        <h1 className='text-gray-50'>{title}</h1>
        <p className='text-gray-200 text-lg mt-2'>{subtitle}</p>
      </div>
    </div>
  );
};

export default PageHeader;
