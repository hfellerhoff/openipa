import Head from 'next/head';
import Link from 'next/link';
import React, { useState } from 'react';
import Button from '../../src/components/buttons/Button';
import PageHeader from '../../src/components/header/PageHeader';
import TextInput from '../../src/components/input/TextInput';
import Layout from '../../src/components/layout/Layout';
import useSupabaseTable from '../../src/hooks/useSupabaseTable';
import { Language } from '../../src/lib/supabase/models/Language';
import { Text } from '../../src/lib/supabase/models/Text';
import { capitalizeFirstLetter } from '../../src/util/StringHelper';

interface Props {}

const TextsPage = (props: Props) => {
  const languages = useSupabaseTable<Language>('languages');
  const texts = useSupabaseTable<Text>('texts');

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
      <div className='w-full max-w-6xl mx-auto px-4 py-4 md:py-6 lg:py-12 flex flex-col-reverse lg:grid lg:grid-cols-2'>
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
                    <h3 className='font-normal text-lg'>{text.title}</h3>
                    <p className='font-normal text-sm'>
                      {language.label} {capitalizeFirstLetter(text.type)}
                    </p>
                  </button>
                ))}
            </div>
          ))}
        </div>
        <div className='mx-4 pb-8 lg:p-0'>
          <div className='sticky top-24'>
            {selectedText ? (
              <>
                <div className='mb-4 flex align-center justify-between'>
                  <div>
                    <h2 className='text-lg'>{selectedText.title}</h2>
                    <p className='font-normal text-sm'>
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
                <TextInput
                  inputText={selectedText.text}
                  setInputText={() => {}}
                  displayHeight={500}
                />
              </>
            ) : (
              <p className='text-xl'>No text selected.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TextsPage;