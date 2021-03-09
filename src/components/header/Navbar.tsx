import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useRef } from 'react';
import { UserContext } from '../../state/context/UserContextProvider';
import styles from './Navbar.module.scss';

interface Props {}

const Navbar: React.FC<Props> = () => {
  const user = useContext(UserContext);
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Link href='/'>
        <a className={styles['logo-container']}>
          <img src='/assets/logo.png' alt='Open IPA' className={styles.logo} />
          <h5 className={styles.title}>Open IPA</h5>
        </a>
      </Link>

      <div className={styles['link-container']}>
        {router.pathname.includes('editor') ? (
          <>
            <Link href='/editor/ipa'>
              <a className='button button--primary button--rounded'>IPA</a>
            </Link>
            <Link href='/editor/1'>
              <a className='button button--primary button--rounded'>Latin</a>
            </Link>
          </>
        ) : (
          <>
            <Link href='/support'>
              <a className='button button--secondary button--rounded'>
                Support
              </a>
            </Link>
            {user.session ? (
              <Link href='/editor'>
                <a className='button button--primary button--rounded'>Editor</a>
              </Link>
            ) : (
              <></>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
