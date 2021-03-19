import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useRef } from 'react';
import { UserContext } from '../../state/context/UserContextProvider';
import styles from './Navbar.module.scss';
import NavbarLink from './NavbarLink';

interface Props {}

const Navbar: React.FC<Props> = () => {
  const user = useContext(UserContext);
  const router = useRouter();

  return (
    <div className={styles.container}>
      {/* <Link href='/'>
        <a className={styles['logo-container']}>
          <img src='/assets/logo.png' alt='Open IPA' className={styles.logo} />
          <h5 className={styles.title}>Open IPA</h5>
        </a>
      </Link> */}

      <NavbarLink
        href='/'
        hoverClassName='hover:bg-blue-200 hover:bg-opacity-10'
      >
        <div className='flex align-center justify-center'>
          <img src='/assets/logo.png' alt='Open IPA' className={styles.logo} />
          <h1 className={styles.title}>Open IPA</h1>
        </div>
      </NavbarLink>

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
            <NavbarLink
              href='/texts'
              hoverClassName='hover:bg-green-500 hover:bg-opacity-50'
            >
              Texts
            </NavbarLink>
            <NavbarLink
              href='/transcription/latin'
              hoverClassName='hover:bg-blue-500 hover:bg-opacity-50'
            >
              Transcribe
            </NavbarLink>
            <NavbarLink
              href='/support'
              hoverClassName='hover:bg-yellow-700 hover:bg-opacity-75'
            >
              Support
            </NavbarLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
