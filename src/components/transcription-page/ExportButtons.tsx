import React, { useState } from 'react';
import ExportButton from '../buttons/ExportButton';
import { Result, Languages } from '../../constants/Interfaces';
import createPDFFromResult from '../../util/CreatePDF';
import copyResult from '../../util/CopyResult';
import styles from './ExportButtons.module.scss';

interface Props {
  language: string;
  result: Result;
}

const ExportButtons: React.FC<Props> = ({ language, result }) => {
  const [isPDFCreated, setIsPDFCreated] = useState(true);

  const createPDF = () => {
    setIsPDFCreated(false);
    setTimeout(() => {
      createPDFFromResult(language as Languages, result).then(() =>
        setIsPDFCreated(true)
      );
    }, 400);
    // I know this whole function is kinda gross, but for some reason
    // this is more responsive than having no delay whatsoever
  };

  return (
    <div className={styles['export-container']}>
      <ExportButton
        title='Export as PDF'
        onClick={() => createPDF()}
        isLoading={!isPDFCreated}
      ></ExportButton>
      <div style={{ width: 15, height: 15 }}></div>
      <ExportButton
        title='Copy'
        onClick={() => copyResult(result)}
      ></ExportButton>
    </div>
  );
};

export default ExportButtons;
