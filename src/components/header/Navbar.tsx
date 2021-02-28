import Link from 'next/link';
import React, { useRef } from 'react';
import styles from './Navbar.module.scss';

interface Props {}

const Navbar: React.FC<Props> = () => {
  return (
    <div className={styles.container}>
      <Link href='/'>
        <a className={styles['logo-container']}>
          <img src='/assets/logo.png' alt='Open IPA' className={styles.logo} />
          <h5 className={styles.title}>Open IPA</h5>
        </a>
      </Link>
      <div className={styles['link-container']}>
        <Link href='/support'>
          <a className='button button--secondary button--rounded'>Support</a>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
