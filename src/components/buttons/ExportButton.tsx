import clsx from 'clsx';
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
      type='button'
      disabled={isDisabled}
      className={clsx(
        {
          'bg-gray-900 hover:bg-gray-800': !isDisabled,
          'bg-gray-400 cursor-not-allowed': isDisabled,
        },
        'px-6 py-3 text-white rounded-lg'
      )}
    >
      {isLoading ? <PulseLoader color='white' size={10} /> : title}
    </button>
  );
};

export default ExportButton;
