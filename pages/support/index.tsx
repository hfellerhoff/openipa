import React from 'react';

import Head from 'next/head';
import Image from 'next/image';

import Button from '../../src/components/buttons/Button';
import PageHeader from '../../src/components/header/PageHeader';
import Layout from '../../src/components/layout/Layout';

interface SupportButtonProps {
  imageSrc: string;
  imageAlt: string;
  children: string;
  buttonClassName: string;
  href: string;
}
const SupportButton: React.FC<SupportButtonProps> = ({
  imageSrc,
  imageAlt,
  children,
  buttonClassName,
  href,
}) => (
  <Button
    variant='wide'
    colorClassName={buttonClassName}
    className='flex mb-2 align-center'
    href={href}
    target='_blank'
    rel='noopener noreferrer'
  >
    <Image src={imageSrc} alt={imageAlt} height={20} width={20} />
    <span className='ml-2 font-semibold'>{children}</span>
  </Button>
);

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
        colorClassName='bg-indigo-900 bg-opacity-80'
      />
      <div className='flex flex-col w-full max-w-5xl gap-16 px-6 py-6 mx-auto lg:grid lg:grid-cols-2 lg:py-12'>
        <div>
          <h2>Community</h2>
          <p className='mt-2 mb-4 text-base opacity-95 lg:mb-8'>
            Open IPA is community-driven. With the amount of work that goes into
            the project, support from the community is crucial in making Open
            IPA the most accurate and helpful tool it can be. With each language
            offered having its own host of rules, exceptions, and edge cases, it
            requires more than just one person to keep afloat.
          </p>

          <SupportButton
            imageSrc='/assets/reddit-white.png'
            imageAlt='Reddit'
            href='https://www.reddit.com/r/openipa/'
            buttonClassName='bg-orange-500 hover:bg-orange-600 focus:ring-orange-600'
          >
            Join the Community
          </SupportButton>
          <SupportButton
            imageSrc='/assets/github-white.png'
            imageAlt='GitHub'
            href='https://github.com/hfellerhoff/openipa'
            buttonClassName='bg-gray-600 hover:bg-gray-700 focus:ring-gray-700'
          >
            Contribute to Development
          </SupportButton>
        </div>
        <div className='mt-8 lg:mt-0'>
          <h2>Donate</h2>
          <p className='mt-2 mb-4 text-base opacity-95 lg:mb-8'>
            Creating, developing, and hosting a web application does not come
            without costs. In order to ensure that Open IPA thrives and that
            development can continue, please consider supporting the project
            financially. Your support goes a long way towards ensuring that Open
            IPA stays up, stays accurate, and continues to help transcribe into
            the future.
          </p>

          <SupportButton
            imageSrc='/assets/kofi.png'
            imageAlt='Buy me a coffee'
            href='https://ko-fi.com/henryfellerhoff'
            buttonClassName='bg-pink-600 hover:bg-pink-700 focus:ring-pink-700'
          >
            Buy Me a Coffee
          </SupportButton>
        </div>
      </div>
    </Layout>
  );
};

export default SupportPage;
