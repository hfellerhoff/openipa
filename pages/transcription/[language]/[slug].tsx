import dayjs from 'dayjs';
import Head from 'next/head';
import React, { useState } from 'react';
import Layout from '../../../src/components/layout/Layout';
import ExportButtons from '../../../src/components/transcription-page/TranscriptionActionButtons';
import TranscriptionDescription from '../../../src/components/transcription-page/TranscriptionDescription';
import TranscriptionEditor from '../../../src/components/transcription-page/TranscriptionEditor';
import { Languages, Result } from '../../../src/constants/Interfaces';
import Template from '../../../src/constants/Template';
import { Dictionary } from '../../../src/hooks/useSupabaseTable';
import supabase from '../../../src/lib/supabase';
import { Language } from '../../../src/lib/supabase/models/Language';
import { Text } from '../../../src/lib/supabase/models/Text';
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
        <div className='mx-auto max-w-7xl'>
          <div className={styles['content-container']}>
            <h1 className='mb-1 text-3xl md:text-4xl'>{text.title}</h1>
            <h2 className='mb-8 text-xl font-normal'>
              {language.label} {text.type}
            </h2>

            <TranscriptionDescription
              language={language.label as Languages}
              setLanguage={setLocalLanguage}
              lockLanguage
            />
            <TranscriptionEditor
              language={localLanguage}
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
      </div>
    </Layout>
  );
};

export default TextPage;

export async function getStaticProps({ params }) {
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
