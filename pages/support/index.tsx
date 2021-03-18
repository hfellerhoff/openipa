import Head from 'next/head';
import React from 'react';
import Layout from '../../src/components/layout/Layout';
import LeftCard from '../../src/components/support-page/LeftCard';
import RightCard from '../../src/components/support-page/RightCard';
import styles from './SupportPage.module.scss';

interface Props {}

const SupportPage: React.FC<Props> = () => {
  return (
    <Layout>
      <Head>
        <title>Support - Open IPA</title>
        <link rel='icon' href='/favicon.ico' />
        <meta
          name='description'
          content='Resources to help support Open IPA and help keep our service alive. Consider supporting us with your time or money and keep quality IPA transcription free and available for everyone.'
        />
      </Head>
      <div className={styles.container}>
        <div className={styles['hero-container']}>
          <h1 className={styles['hero-title']}>Want to support Open IPA?</h1>
          <h3 className={styles['hero-subtitle']}>
            There are two ways to do it:
          </h3>
        </div>
        <div className={styles['card-container']}>
          <LeftCard />
          <RightCard />
        </div>
      </div>
    </Layout>
  );
};

export default SupportPage;
