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
import styles from './TranscriptionPage.module.scss';

interface Props {
  text?: {
    id: number;
    slug: string;
    title: string;
    text: string;
    language: number;
  };
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

  // useEffect(() => {
  //   setLanguage(router.query.language as Languages);
  // }, [router.query.language]);

  return (
    <Layout>
      <Head>
        <title>
          {text && language ? `${text.title} - Latin to ` : ''}IPA Text
          Transcription - Open IPA
        </title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className={styles.container}>
        <div className={styles['content-container']}>
          <h1 className='text-3xl md:text-4xl mb-1'>{text.title}</h1>
          <h2 className='text-xl font-normal mb-8'>{author.name}</h2>

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
  // Call an external API endpoint to get posts
  let { data: texts } = await supabase
    .from('texts')
    .select('*')
    .eq('slug', params.slug);

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

  console.log(texts);
  console.log(paths);

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}
