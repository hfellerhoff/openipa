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
      <NavbarLink href='/'>
        <div className='flex justify-center align-center'>
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
            <NavbarLink href='/texts'>Texts</NavbarLink>
            <NavbarLink href='/transcription/latin'>Transcribe</NavbarLink>
            <NavbarLink href='/support'>Support</NavbarLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
