import React from 'react';

import { Languages } from '../../constants/Interfaces';
import LanguageSelectButton from '../buttons/LanguageSelectButton';
import styles from './LanguageSelectionButtons.module.scss';

const LanguageSelectionButtons: React.FC = () => {
  return (
    <div className={styles['button-container']}>
      <LanguageSelectButton language={Languages.Latin} status='active' />
      <LanguageSelectButton language={Languages.French} status='active' />
      {/* <LanguageSelectButton language={Languages.Italian} status='inactive' /> */}
      {/* <LanguageSelectButton language={Languages.German} status='inactive' /> */}
    </div>
  );
};

export default LanguageSelectionButtons;
