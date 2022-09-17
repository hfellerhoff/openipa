import React from 'react';
import PrivateLayout from './PrivateLayout';

interface Props {
  leftSidebar?: JSX.Element;
  rightSidebar?: JSX.Element;
  children: JSX.Element | JSX.Element[];
}

const EditorLayout = ({ leftSidebar, rightSidebar, children }: Props) => {
  const hasBothSidebars = !!leftSidebar && !!rightSidebar;
  const hasRightSidebar = !!rightSidebar;

  return (
    <PrivateLayout>
      <div
        className={
          hasBothSidebars
            ? 'flex justify-center'
            : hasRightSidebar
            ? 'flex justify-center'
            : 'max-w-4xl mx-auto'
        }
      >
        {leftSidebar ? (
          <aside className='shadow overflow-y-scroll sticky -mt-16 top-0 w-[12rem] h-screen box-border bg-white'>
            <div className='mt-16'>{leftSidebar}</div>
          </aside>
        ) : (
          <></>
        )}
        <main className='flex-1'>{children}</main>
        {rightSidebar ? (
          <aside className='shadow overflow-y-scroll sticky -mt-16 top-0 w-[30rem] h-screen box-border bg-white'>
            <div className='mt-16'>{rightSidebar}</div>
          </aside>
        ) : (
          <></>
        )}
      </div>
    </PrivateLayout>
  );
};

export default EditorLayout;
