import React from 'react';

import Image from 'next/image';

import styles from './Footer.module.scss';

interface Props {}

const Footer: React.FC<Props> = () => {
  return (
    <div className={styles.footer}>
      <a
        href='https://www.henryfellerhoff.com?ref=openipa'
        target='_blank noopener noreferrer'
        className={styles['logo-container']}
      >
        <Image
          alt='Logo'
          src='/assets/henryfellerhoff-energetic.png'
          className={styles['logo']}
          width={40}
          height={40}
        />
        <h3 className={styles.name}>Built by Henry Fellerhoff</h3>
      </a>
      <div className={styles['logo-links']}>
        <div
          className={`${styles['logo-link-container']} ${styles['logo-link-container-github']}`}
        >
          <a
            title='Go to GitHub repository'
            href='https://github.com/hfellerhoff/openipa'
            target='_blank noopener noreferrer'
            className={styles['logo-container']}
          >
            <Image
              alt='Logo'
              width={35}
              height={35}
              src='/assets/github-white.png'
              className={styles['logo-link']}
            />
          </a>
        </div>
        <div
          className={`${styles['logo-link-container']} ${styles['logo-link-container-reddit']}`}
        >
          <a
            title='Go to subreddit'
            href='https://www.reddit.com/r/openipa/'
            target='_blank noopener noreferrer'
            className={`${styles['logo-container']}`}
          >
            <Image
              alt='Logo'
              width={35}
              height={35}
              src='/assets/reddit-white.png'
              className={`${styles['logo-link']} ${styles['logo-link-reddit']}`}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
