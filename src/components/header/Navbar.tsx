import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useRef } from 'react';
import { UserContext } from '../../state/context/UserContextProvider';
import styles from './Navbar.module.scss';
import NavbarLink from './NavbarLink';

interface Props {}

const CoreNavigation = () => (
  <>
    <NavbarLink href='/texts'>Texts</NavbarLink>
    <NavbarLink href='/transcription/latin'>Transcribe</NavbarLink>
    <NavbarLink href='/support'>Support</NavbarLink>
  </>
);

const EditorNavigation = () => (
  <>
    <NavbarLink href='/editor/ipa'>IPA</NavbarLink>
    <NavbarLink href='/editor/latin'>Latin</NavbarLink>
    <NavbarLink href='/editor/french'>French</NavbarLink>
  </>
);

const Navbar: React.FC<Props> = () => {
  const user = useContext(UserContext);
  const router = useRouter();
  const isEditor = router.pathname.includes('editor');

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
          <EditorNavigation />
        ) : (
          <CoreNavigation />
        )}
      </div>
    </div>
  );
};

export default Navbar;
