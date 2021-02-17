import React, { useEffect, useState } from 'react';
import TranscriptionEditor from '../../src/components/transcription-page/TranscriptionEditor';
import TranscriptionDescription from '../../src/components/transcription-page/TranscriptionDescription';
import ExportButtons from '../../src/components/transcription-page/ExportButtons';
import Footer from '../../src/components/footer/Footer';

import { Languages, Result } from '../../src/constants/Interfaces';
import Template from '../../src/constants/Template';
import { capitalizeFirstLetter } from '../../src/util/StringHelper';
import styles from './TranscriptionPage.module.scss';
import { useRouter } from 'next/router';
import Layout from '../../src/components/layout/Layout';

type Props = {
  language: string;
};

const TranscriptionPage: React.FC<Props> = () => {
  const router = useRouter();
  const [result, setResult] = useState<Result>(Template.Result);
  const language: Languages = router.query.language as Languages;

  console.log(language);

  // French Transcription Options
  const [shouldAnalyzeElision, setShouldAnalyzeElision] = useState(true);
  const [shouldAnalyzeLiason, setShouldAnalyzeLiason] = useState(true);

  useEffect(() => {
    if (
      !(capitalizeFirstLetter(language) in Languages) &&
      router.query.language
    ) {
      if (router) router.replace('/');
    }
  });

  if (capitalizeFirstLetter(language) in Languages) {
    return (
      <Layout>
        <div className={styles.container}>
          <TranscriptionDescription
            language={language}
            shouldAnalyzeElision={shouldAnalyzeElision}
            setShouldAnalyzeElision={setShouldAnalyzeElision}
            shouldAnalyzeLiason={shouldAnalyzeLiason}
            setShouldAnalyzeLiason={setShouldAnalyzeLiason}
          />
          <TranscriptionEditor
            language={language}
            shouldAnalyzeElision={shouldAnalyzeElision}
            shouldAnalyzeLiason={shouldAnalyzeLiason}
            result={result}
            setResult={setResult}
          />
          <ExportButtons language={language} result={result} />
        </div>
      </Layout>
    );
  }
  return <></>;
};

export default TranscriptionPage;
