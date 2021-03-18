import React from 'react';
import PrivateLayout from './PrivateLayout';
import styles from './EditorLayout.module.scss';
import Head from 'next/head';

interface Props {
  leftSidebar?: JSX.Element;
  rightSidebar?: JSX.Element;
  children: JSX.Element | JSX.Element[];
}

const EditorLayout = ({ leftSidebar, rightSidebar, children }: Props) => {
  return (
    <PrivateLayout>
      <div
        className={`${styles.container} ${
          !leftSidebar && !rightSidebar ? styles['container--no-sidebar'] : ''
        }`}
      >
        {leftSidebar ? (
          <aside className={`${styles.sidebar} ${styles['left-sidebar']}`}>
            {leftSidebar}
          </aside>
        ) : (
          <></>
        )}
        <main>{children}</main>
        {rightSidebar ? (
          <aside className={`${styles.sidebar} ${styles['right-sidebar']}`}>
            {rightSidebar}
          </aside>
        ) : (
          <></>
        )}
      </div>
    </PrivateLayout>
  );
};

export default EditorLayout;
