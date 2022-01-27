import React, { useEffect, useState } from 'react';
import TranscriptionEditor from '../../../src/components/transcription-page/TranscriptionEditor';
import TranscriptionDescription from '../../../src/components/transcription-page/TranscriptionDescription';
import ExportButtons from '../../../src/components/transcription-page/ExportButtons';

import { Languages, Result } from '../../../src/constants/Interfaces';
import Template from '../../../src/constants/Template';
import { capitalizeFirstLetter } from '../../../src/util/StringHelper';
import styles from './TranscriptionPage.module.scss';
import { useRouter } from 'next/router';
import Layout from '../../../src/components/layout/Layout';
import Head from 'next/head';
import PageHeader from '../../../src/components/header/PageHeader';

type Props = {};

const TranscriptionPage = ({}: Props) => {
  const router = useRouter();
  const [result, setResult] = useState<Result>(Template.Result);
  const [language, setLanguage] = useState<Languages>(
    router.query.language as Languages
  );

  const text = router.query.text as string;

  // General Transcription Options
  const [shouldHideOriginalText, setShouldHideOriginalText] = useState(false);

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

  if (!(capitalizeFirstLetter(language) in Languages)) return <></>;
  return (
    <Layout>
      <Head>
        <title>
          {language ? `${capitalizeFirstLetter(language)} ` : ''}Language
          Transcription - Open IPA
        </title>
        <link rel='icon' href='/favicon.ico' />
        <meta
          name='description'
          content={`Free, informative IPA transcription for Lyric Diction. Transcribe any ${
            language ? capitalizeFirstLetter(language) : 'foreign language'
          } text into the International Phonetic Alphabet in real-time, and receive nuanced feedback for each transcription step.`}
        />
      </Head>
      <PageHeader
        title='Transcription'
        subtitle='Type or paste your text below to transcribe it into the International Phonetic Alphabet.'
        colorClassName='bg-blue-900 bg-opacity-75'
      />
      <div className={styles.container}>
        <div className='mx-auto max-w-7xl'>
          <div className={styles['content-container']}>
            <TranscriptionDescription
              language={language}
              setLanguage={setLanguage}
              shouldAnalyzeElision={shouldAnalyzeElision}
              setShouldAnalyzeElision={setShouldAnalyzeElision}
              shouldAnalyzeLiason={shouldAnalyzeLiason}
              setShouldAnalyzeLiason={setShouldAnalyzeLiason}
              shouldHideOriginalText={shouldHideOriginalText}
              setShouldHideOriginalText={setShouldHideOriginalText}
            />
            <TranscriptionEditor
              language={language}
              shouldAnalyzeElision={shouldAnalyzeElision}
              shouldAnalyzeLiason={shouldAnalyzeLiason}
              shouldHideOriginalText={shouldHideOriginalText}
              result={result}
              setResult={setResult}
              text={text}
            />
            <ExportButtons
              language={language}
              result={result}
              shouldHideOriginalText={shouldHideOriginalText}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TranscriptionPage;
