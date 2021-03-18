import dayjs from 'dayjs';
import Head from 'next/head';
import React, { useState } from 'react';
import LanguageSelectionButtons from '../../../src/components/button-containers/LanguageSelectionButtons';
import Layout from '../../../src/components/layout/Layout';
import ExportButtons from '../../../src/components/transcription-page/ExportButtons';
import TranscriptionDescription from '../../../src/components/transcription-page/TranscriptionDescription';
import TranscriptionEditor from '../../../src/components/transcription-page/TranscriptionEditor';
import { Languages, Result } from '../../../src/constants/Interfaces';
import Template from '../../../src/constants/Template';
import { Dictionary } from '../../../src/hooks/useSupabaseTable';
import supabase from '../../../src/lib/supabase';
import { Language } from '../../../src/lib/supabase/models/Language';
import { Text } from '../../../src/lib/supabase/models/Text';
import { capitalizeFirstLetter } from '../../../src/util/StringHelper';
import styles from './TranscriptionPage.module.scss';

interface Props {
  text?: Text;
  language?: Language;
  author?: any;
}

const TextPage = ({ text, language, author }: Props) => {
  const [result, setResult] = useState<Result>(Template.Result);
  const [localLanguage, setLocalLanguage] = useState<Languages>(
    language.label.toLowerCase() as Languages
  );

  // French Transcription Options
  const [shouldAnalyzeElision, setShouldAnalyzeElision] = useState(true);
  const [shouldAnalyzeLiason, setShouldAnalyzeLiason] = useState(true);

  return (
    <Layout>
      <Head>
        <title>
          {text && language ? `${text.title} - ${language.label} to ` : ''}
          IPA Text Transcription - Open IPA
        </title>
        <meta
          name='description'
          content={
            text && language
              ? `Free, fast, real-time transcription of the ${language.label.toLowerCase()} text ${
                  text.title
                }, with detailed explanations of each transcription rule.`
              : 'Free, fast, real-time foreign language to IPA transcription, with detailed explanations of each transcription rule.'
          }
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className={styles.container}>
        <div className={styles['content-container']}>
          <h1 className='text-3xl md:text-4xl mb-1'>{text.title}</h1>
          <h2 className='text-xl font-normal mb-8'>
            {language.label} {text.type}
          </h2>

          <TranscriptionDescription
            language={language.label.toLowerCase()}
            setLanguage={setLocalLanguage}
            shouldAnalyzeElision={shouldAnalyzeElision}
            setShouldAnalyzeElision={setShouldAnalyzeElision}
            shouldAnalyzeLiason={shouldAnalyzeLiason}
            setShouldAnalyzeLiason={setShouldAnalyzeLiason}
            lockLanguage
          />
          <TranscriptionEditor
            language={localLanguage}
            shouldAnalyzeElision={shouldAnalyzeElision}
            shouldAnalyzeLiason={shouldAnalyzeLiason}
            result={result}
            setResult={setResult}
            text={text.text}
          />
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
            It was last updated on{' '}
            {dayjs(text.updated_at).format('MMMM DD, YYYY')}.
          </p>
          <ExportButtons language={language.label} result={result} />
        </div>
      </div>
      <div
        className={`pb-16 pt-16 flex align-center justify-center flex-col ${styles['banner-container']} px-8`}
      >
        <div className='max-w-4xl flex align-center justify-center flex-col mx-auto text-center'>
          <h2 className={`text-4xl ${styles['banner-title']} font-bold`}>
            Open IPA
          </h2>
          <h2 className='text-gray-100 font-light text-2xl mt-2 mb-4'>
            is a free, informative IPA transcription tool for Lyric Diction.
          </h2>
          <h2 className='text-gray-100 font-light text-2xl mt-8'>
            Supported Languages:
          </h2>
          <LanguageSelectionButtons />
        </div>
      </div>
    </Layout>
  );
};

export default TextPage;

export async function getStaticProps({ params }) {
  console.log(params);

  // Call an external API endpoint to get posts
  const { data: languages } = await supabase.from('languages').select('*');

  const currentLanguage = languages.filter(
    (l) => l.label.toLowerCase() === params.language
  )[0];

  let { data: texts } = await supabase
    .from('texts')
    .select('*')
    .eq('slug', params.slug);

  texts = texts.filter((t) => t.language === currentLanguage.id);

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time

  if (texts.length > 0) {
    let { data: languages } = await supabase
      .from('languages')
      .select('*')
      .eq('id', texts[0].language);

    let { data: authors } = await supabase
      .from('authors')
      .select('*')
      .eq('id', texts[0].author);

    if (languages.length > 0 && authors.length > 0) {
      return {
        props: {
          text: texts[0],
          language: languages[0],
          author: authors[0],
        },
      };
    }
    return {
      props: {
        text: texts[0],
        language: undefined,
      },
    };
  }
  return {
    props: {
      text: undefined,
    },
  };
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  let { data: texts } = await supabase.from('texts').select('*');
  let { data: languages } = await supabase.from('languages').select('*');

  let languageDictionary: Dictionary<string> = {};
  languages.forEach((language: Language) => {
    languageDictionary[language.id] = language.label;
  });

  // Get the paths we want to pre-render based on posts
  const paths = texts.map(
    (text) =>
      `/transcription/${languageDictionary[text.language].toLowerCase()}/${
        text.slug
      }`
  );

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}
