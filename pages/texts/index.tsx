import { useState } from 'react';

import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import Button from '../../src/components/buttons/Button';
import PageHeader from '../../src/components/header/PageHeader';
import TextInput from '../../src/components/input/TextInput';
import Layout from '../../src/components/layout/Layout';
import supabase from '../../src/lib/supabase';
import { Language } from '../../src/lib/supabase/models/Language';
import { Text } from '../../src/lib/supabase/models/Text';
import { capitalizeFirstLetter } from '../../src/util/StringHelper';

interface Props {
  languages: Language[];
  texts: Text[];
}

const TextsPage = ({ languages, texts }: Props) => {
  const [selectedText, setSelectedText] = useState<Text>();

  return (
    <Layout>
      <Head>
        <title>Texts - Open IPA</title>
        <meta
          name='description'
          content='Browse a number of popular collected texts from all the languages we can transcribe. Get real-time, informative foreign language text to IPA transcription for lyric diction.'
        />
      </Head>
      <PageHeader
        title='Texts'
        subtitle='Browse a number of popular collected texts from all the languages we can transcribe.'
        colorClassName='bg-green-900 bg-opacity-75'
      />
      <div className='flex flex-col-reverse w-full max-w-6xl px-4 py-4 mx-auto md:py-6 lg:py-12 lg:grid lg:grid-cols-2'>
        <div>
          {Object.values(languages).map((language: Language) => (
            <div key={language.id} className='mb-8'>
              <h2 className='mb-4 ml-4'>{language.label}</h2>
              {Object.values(texts)
                .filter((t: Text) => t.language === language.id)
                .sort((a, b) => {
                  if (a.title < b.title) return -1;
                  else return 1;
                })
                .map((text: Text) => (
                  <button
                    key={text.id}
                    className={`block text-left w-full hover:shadow-inner hover:bg-gray-200 my-0.5 py-2 px-4 rounded ${
                      selectedText
                        ? selectedText.id === text.id
                          ? 'shadow-inner bg-gray-200'
                          : ''
                        : ''
                    }`}
                    onClick={() => {
                      if (!process.browser) return;
                      if (window.innerWidth < 1024) window.scrollTo(0, 0);
                      setSelectedText(text);
                    }}
                  >
                    <h3 className='text-lg font-normal'>{text.title}</h3>
                    <p className='text-sm font-normal'>
                      {language.label} {capitalizeFirstLetter(text.type)}
                    </p>
                  </button>
                ))}
            </div>
          ))}
        </div>
        <div className='pb-8 mx-4 lg:p-0'>
          <div className='sticky top-24'>
            {selectedText && languages[selectedText.language] ? (
              <>
                <div className='flex justify-between mb-4 align-center'>
                  <div>
                    <h2 className='text-lg'>{selectedText.title}</h2>
                    <p className='text-sm font-normal'>
                      {languages[selectedText.language].label}{' '}
                      {capitalizeFirstLetter(selectedText.type)}
                    </p>
                  </div>
                  <Link
                    href={`/transcription/${languages[
                      selectedText.language
                    ].label.toLowerCase()}/${selectedText.slug}`}
                  >
                    <a className='mt-1'>
                      <Button className='h-10'>Transcribe</Button>
                    </a>
                  </Link>
                </div>
                <TextInput inputText={selectedText.text} displayHeight={500} />
              </>
            ) : (
              <p className='text-lg quote'>
                No text selected. Pick a piece to transcribe it!
              </p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TextsPage;

export const getStaticProps: GetStaticProps = async () => {
  // Call an external API endpoint to get posts
  const languages: Record<number, Language> = {};
  const { data: languagesArray } = await supabase
    .from<Language>('languages')
    .select('*');

  if (!languagesArray) {
    return {
      props: {
        languages: [],
        texts: [],
      },
    };
  }

  languagesArray.forEach((language) => (languages[language.id] = language));

  const texts: Record<number, Text> = {};
  const { data: textsArray } = await supabase.from<Text>('texts').select('*');

  if (!textsArray) {
    return {
      props: {
        languages,
        texts: [],
      },
    };
  }

  textsArray.forEach((text) => (texts[text.id] = text));

  if (languages && texts) {
    return {
      props: {
        languages,
        texts,
      },
    };
  } else {
    return {
      props: {
        languages: [],
        texts: [],
      },
    };
  }
};
