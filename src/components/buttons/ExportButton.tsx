import React from 'react';
import { PulseLoader } from 'react-spinners';
import styles from './ExportButton.module.scss';

interface Props {
  title: string;
  onClick: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
}

const ExportButton: React.FC<Props> = ({
  title,
  onClick,
  isLoading = false,
  isDisabled,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${styles['export-button']} ${
        isDisabled && styles['export-button--disabled']
      }`}
    >
      {isLoading ? <PulseLoader color='white' size={10} /> : title}
    </button>
  );
};

export default ExportButton;
