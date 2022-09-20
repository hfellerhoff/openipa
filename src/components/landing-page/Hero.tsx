import React from 'react';

import LanguageSelectionButtons from '../button-containers/LanguageSelectionButtons';
import styles from './Hero.module.scss';

const Hero: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Open IPA</h1>
      <h3 className={styles.subtitle}>
        Free, informative IPA transcription for Lyric Diction
      </h3>
      <h4 className={styles['call-to-action']}>Get started with:</h4>
      <LanguageSelectionButtons />
    </div>
  );
};

export default Hero;
