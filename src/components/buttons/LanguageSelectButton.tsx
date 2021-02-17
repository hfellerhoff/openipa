import React from 'react';
import { Languages } from '../../constants/Interfaces';
import styles from './LanguageSelectButton.module.scss';
import { capitalizeFirstLetter } from '../../util/StringHelper';
import Link from 'next/link';

interface Props {
  language: Languages;
  status: 'active' | 'caution' | 'inactive';
}

const LanguageSelectButton: React.FC<Props> = ({ language, status }) => {
  const className = `${styles.button} ${styles[`button--${status}`]}`;

  if (status !== 'inactive') {
    return (
      <Link href={`/transcription/${language}`}>
        <a className={className}>{capitalizeFirstLetter(language)}</a>
      </Link>
    );
  }
  return <div className={className}>{capitalizeFirstLetter(language)}</div>;
};

export default LanguageSelectButton;
