import React from 'react';
import { PulseLoader } from 'react-spinners';
import styles from './ExportButton.module.scss';

interface Props {
  title: string;
  onClick: () => void;
  isLoading?: boolean;
}

const ExportButton: React.FC<Props> = ({ title, onClick, isLoading }) => {
  if (isLoading === undefined) isLoading = false;
  return (
    <button onClick={onClick} className={styles['export-button']}>
      {isLoading ? <PulseLoader color='white' size={10} /> : title}
    </button>
  );
};

export default ExportButton;
