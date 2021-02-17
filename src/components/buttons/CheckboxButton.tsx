import React from 'react';
import styles from './CheckboxButton.module.scss';

interface Props {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

const CheckboxButton: React.FC<Props> = ({ isChecked, setIsChecked }) => {
  return (
    <button
      className={styles['option-checkbox']}
      onClick={() => setIsChecked(!isChecked)}
    >
      {isChecked ? (
        <img
          src='/assets/checkmark.png'
          alt=''
          className={styles['option-checkbox-image']}
        />
      ) : (
        <></>
      )}
    </button>
  );
};

export default CheckboxButton;
