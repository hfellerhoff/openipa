import React from 'react';

import Image from 'next/image';

import styles from './CheckboxButton.module.scss';

interface Props {
  isChecked: boolean;
  setIsChecked: (v: boolean) => void;
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
        <Image
          src='/assets/checkmark.png'
          alt='Checkmark'
          width={15}
          height={15}
        />
      ) : (
        <></>
      )}
    </button>
  );
};

export default CheckboxButton;
