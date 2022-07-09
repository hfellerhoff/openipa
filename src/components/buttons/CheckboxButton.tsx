import React from 'react';
import styles from './CheckboxButton.module.scss';

interface Props {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
}

const CheckboxButton: React.FC<Props> = ({ isChecked, setIsChecked, id }) => {
  return (
    <button
      type='button'
      id={id}
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
