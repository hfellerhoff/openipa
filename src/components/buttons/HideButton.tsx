import React from 'react';

import styles from './HideButton.module.scss';

interface Props {
  shouldShow: boolean;
  setShouldShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const HideButton: React.FC<Props> = ({ shouldShow, setShouldShow }) => {
  return (
    <button
      className={styles['hide-button']}
      onClick={() => setShouldShow(!shouldShow)}
    >
      {shouldShow ? 'Hide' : 'Show'}
    </button>
  );
};

export default HideButton;
