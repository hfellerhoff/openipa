import Head from 'next/head';
import React from 'react';
import PageHeader from '../../src/components/header/PageHeader';
import Layout from '../../src/components/layout/Layout';
import LeftCard from '../../src/components/support-page/LeftCard';
import RightCard from '../../src/components/support-page/RightCard';
import styles from './SupportPage.module.scss';
import cardStyles from '../../src/components/support-page/SupportCard.module.scss';
import CoffeeButton from '../../src/components/buttons/CoffeeButton';
import Button from '../../src/components/buttons/Button';

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
      <PageHeader
        title='Support'
        subtitle="Open IPA is a free service, and takes a lot of effort to maintain. If you've found the site useful, please consider donating your time or money to help keep it alive."
        colorClassName='bg-purple-900 bg-opacity-75'
      />
      <div className='flex flex-col lg:grid lg:grid-cols-2 w-full max-w-5xl px-6 py-6 lg:py-12 mx-auto gap-16'>
        <div>
          <h2>Community</h2>
          <p className='text-base opacity-95 mt-2 mb-8'>
            Open IPA is community-driven. With the amount of work that goes into
            the project, support from the community is crucial in making Open
            IPA the most accurate and helpful tool it can be. With each language
            offered having its own host of rules, exceptions, and edge cases, it
            requires more than just one person to keep afloat.
          </p>
          <a
            className='flex align-center'
            href='https://www.reddit.com/r/openipa/'
            target='_blank'
          >
            <Button variant='wide' color='yellow'>
              <img
                src='assets/reddit-white.png'
                alt='Reddit'
                className='h-5 w-5'
              />
              <span className='font-semibold ml-2'>Join the Community</span>
            </Button>
          </a>
          <a
            className='flex align-center mt-2'
            href='https://www.reddit.com/r/openipa/'
            target='_blank'
          >
            <Button variant='wide' color='gray'>
              <img
                src='assets/github-white.png'
                alt='GitHub'
                className='h-5 w-5'
              />
              <span className='font-semibold ml-2'>
                Contribute to Development
              </span>
            </Button>
          </a>
        </div>
        <div>
          <h2>Donate</h2>
          <p className='text-base opacity-95 mt-2 mb-8'>
            Creating, developing, and hosting a web application does not come
            without costs. In order to ensure that Open IPA thrives and that
            development can continue, please consider supporting the project
            financially. Your support goes a long way towards ensuring that Open
            IPA stays up, stays accurate, and continues to help transcribe into
            the future.
          </p>
          <a
            className='flex align-center mt-2'
            href='https://ko-fi.com/henryfellerhoff'
            target='_blank'
          >
            <Button variant='wide' color='pink'>
              <img
                src='assets/kofi.png'
                alt='Buy me a coffee'
                className='h-5 w-5'
              />
              <span className='font-semibold ml-2'>Buy Me a Coffee</span>
            </Button>
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default SupportPage;
