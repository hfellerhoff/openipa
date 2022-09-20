import { useState, useEffect } from 'react';

import dayjs from 'dayjs';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Languages, Result } from '../../constants/Interfaces';
import Template from '../../constants/Template';
import { Text } from '../../lib/supabase/models/Text';
import { capitalizeFirstLetter } from '../../util/StringHelper';
import PageHeader from '../header/PageHeader';
import Layout from '../layout/Layout';
import { TranscriptionPageStaticProps } from './getTranscriptionPageStaticProps';
import TranscriptionActionButtons from './TranscriptionActionButtons';
import TranscriptionDescription from './TranscriptionDescription';
import TranscriptionEditor from './TranscriptionEditor';

const PredefinedTextInformation = ({ text }: { text: Text }) => (
  <p className='mt-2'>
    This text is originally from{' '}
    <a
      href={text.source}
      target='_blank'
      rel='noopener noreferrer'
      className='underline'
    >
      this source.
    </a>{' '}
    It was last updated on {dayjs(text.updated_at).format('MMMM DD, YYYY')}.
  </p>
);

interface Props {
  text?: Text | string;
  transcriptionProps: TranscriptionPageStaticProps;
}

export default function TranscriptionPage({ text, transcriptionProps }: Props) {
  const router = useRouter();
  const [result, setResult] = useState<Result>(Template.Result);

  const supabaseText = text as Text | undefined;
  const queryParamsText = router.query.text as string;

  const initialText = supabaseText?.text || queryParamsText || '';

  const language = router.query.language as string as Languages;
  const languageLabel = capitalizeFirstLetter(language);
  const isLanguageSupported = languageLabel in Languages;

  useEffect(() => {
    if (!!language && !isLanguageSupported) router.replace('/transcription');
  }, [isLanguageSupported, language, router]);

  if (!isLanguageSupported) return <></>;

  const setLanguage = (updatedLanguage: Languages) => {
    if (!supabaseText) {
      router.push({
        pathname: `/transcription/${updatedLanguage}`,
      });
    }
  };

  return (
    <Layout>
      <Head>
        <title>{languageLabel} Language Transcription - Open IPA</title>
        <link rel='icon' href='/favicon.ico' />
        <meta
          name='description'
          content={`Free, informative IPA transcription for Lyric Diction. Transcribe any ${languageLabel} text into the International Phonetic Alphabet in real-time, and receive nuanced feedback for each transcription step.`}
        />
      </Head>
      <PageHeader
        title='Transcription'
        subtitle='Type or paste your text below to transcribe it into the International Phonetic Alphabet.'
        colorClassName='bg-blue-900 bg-opacity-75'
      />
      <div className='w-full px-4 py-4 mx-auto max-w-7xl lg:py-8'>
        <TranscriptionDescription
          language={language}
          setLanguage={setLanguage}
        />
        <TranscriptionEditor
          language={language}
          result={result}
          setResult={setResult}
          text={initialText}
          transcriptionProps={transcriptionProps}
        />
        {!!supabaseText && <PredefinedTextInformation text={supabaseText} />}
        <TranscriptionActionButtons language={language} result={result} />
      </div>
    </Layout>
  );
}
