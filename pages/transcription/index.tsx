import React, { useEffect, useState } from 'react';
import TranscriptionEditor from '../../src/components/transcription-page/TranscriptionEditor';
import TranscriptionDescription from '../../src/components/transcription-page/TranscriptionDescription';
import ExportButtons from '../../src/components/transcription-page/ExportButtons';
import Footer from '../../src/components/footer/Footer';

import { Languages, Result } from '../../src/constants/Interfaces';
import Template from '../../src/constants/Template';
import { capitalizeFirstLetter } from '../../src/util/StringHelper';
import styles from './[language]/TranscriptionPage.module.scss';
import { useRouter } from 'next/router';
import Layout from '../../src/components/layout/Layout';
import Head from 'next/head';

type Props = {
  language: string;
};

const TranscriptionPage: React.FC<Props> = () => {
  const router = useRouter();
  const [result, setResult] = useState<Result>(Template.Result);
  const [language, setLanguage] = useState<Languages>(Languages.Latin);

  // French Transcription Options
  const [shouldAnalyzeElision, setShouldAnalyzeElision] = useState(true);
  const [shouldAnalyzeLiason, setShouldAnalyzeLiason] = useState(true);

  useEffect(() => {
    if (
      !(capitalizeFirstLetter(router.query.language as string) in Languages) &&
      router.query.language
    ) {
      if (router) router.replace('/');
    } else if (router.query.language && !language)
      setLanguage(router.query.language as Languages);
  }, [router.query.language]);

  if (capitalizeFirstLetter(language) in Languages) {
    return (
      <Layout>
        <Head>
          <title>
            {language ? `${capitalizeFirstLetter(language)} ` : ''}Language
            Transcription - Open IPA
          </title>
          <meta
            name='description'
            content={`Free, informative IPA transcription for Lyric Diction. Transcribe any ${
              language ? capitalizeFirstLetter(language) : 'foreign language'
            } text into the International Phonetic Alphabet in real-time, and receive nuanced feedback for each transcription step.`}
          />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <div className={styles.container}>
          <div className={styles['content-container']}>
            <TranscriptionDescription
              language={language}
              setLanguage={setLanguage}
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
        </div>
      </Layout>
    );
  }
  return <></>;
};

export default TranscriptionPage;
