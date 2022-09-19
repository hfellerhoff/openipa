import React from 'react';

import Head from 'next/head';

import Demonstration from '../src/components/landing-page/Demonstration';
import Description from '../src/components/landing-page/Description';
import Hero from '../src/components/landing-page/Hero';
import Layout from '../src/components/layout/Layout';


interface Props {}

const LandingPage: React.FC<Props> = () => {
  return (
    <Layout>
      <Head>
        <title>
          Open IPA - Free, informative IPA transcription for Lyric Diction
        </title>
        <link rel='icon' href='/favicon.ico' />
        <meta
          name='description'
          content='Free, informative IPA transcription for Lyric Diction. Transcribe any Latin or French text into the International Phonetic Alphabet in real-time, and receive nuanced feedback for each transcription step.'
        />
      </Head>
      <Hero />
      <Description />
      <Demonstration />
    </Layout>
  );
};

export default LandingPage;
