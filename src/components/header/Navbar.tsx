import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import styles from './Navbar.module.scss';
import NavbarLink from './NavbarLink';
import { useAuth } from '../../state/AuthProvider';

const CoreNavigation = () => (
  <>
    <NavbarLink href='/texts'>Texts</NavbarLink>
    <NavbarLink href='/transcription/french'>Transcribe</NavbarLink>
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

const Navbar: React.FC = () => {
  const { session } = useAuth();
  const router = useRouter();

  const isEditor = router.pathname.includes('editor');
  const isAuthorizedContext = isEditor && !!session;

  return (
    <div className={styles.container}>
      <NavbarLink href='/'>
        <div className='flex justify-center align-center'>
          <Image
            src='/assets/logo.png'
            alt='Open IPA'
            className={styles.logo}
            width={30}
            height={30}
          />
          <h1 className={styles.title}>Open IPA</h1>
        </div>
      </NavbarLink>

      <div className='flex items-center justify-between'>
        {isAuthorizedContext ? <EditorNavigation /> : <CoreNavigation />}
      </div>
    </div>
  );
};

export default Navbar;
