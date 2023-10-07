import React from 'react';

import styles from './Layout.module.scss';
import Footer from '../footer/Footer';
import Navbar from '../header/Navbar';

interface Props {
  children: JSX.Element | JSX.Element[];
}

const Layout = ({ children }: Props) => {
  return (
    <div>
      <div className={styles.container}>
        <Navbar />
        <div className={styles['content-container']}>{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
