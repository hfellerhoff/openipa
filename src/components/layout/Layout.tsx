import React from 'react';
import Footer from '../footer/Footer';
import Navbar from '../header/Navbar';
import styles from './Layout.module.scss';

interface Props {
  children: JSX.Element | JSX.Element[];
}

const Layout = ({ children }: Props) => {
  return (
    <div>
      <Navbar />
      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
