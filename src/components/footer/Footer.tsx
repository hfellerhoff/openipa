import React from 'react';
import styles from './Footer.module.scss';

interface Props {}

const Footer: React.FC<Props> = () => {
  return (
    <div className={styles.footer}>
      <a
        href='https://www.henryfellerhoff.com'
        target='_blank noopener noreferrer'
        className={styles['logo-container']}
      >
        <img
          alt='Logo'
          src='/assets/henryfellerhoff-energetic.png'
          className={styles['logo']}
        />
        <h3 className={styles.name}>Built by Henry Fellerhoff</h3>
      </a>
      <div className={styles['logo-links']}>
        <div
          className={`${styles['logo-link-container']} ${styles['logo-link-container-github']}`}
        >
          <a
            href='https://github.com/hfellerhoff/openipa'
            target='_blank noopener noreferrer'
            className={styles['logo-container']}
          >
            <img
              alt='Logo'
              src='/assets/github-white.png'
              className={styles['logo-link']}
            />
          </a>
        </div>
        <div
          className={`${styles['logo-link-container']} ${styles['logo-link-container-reddit']}`}
        >
          <a
            href='https://www.reddit.com/r/openipa/'
            target='_blank noopener noreferrer'
            className={`${styles['logo-container']}`}
          >
            <img
              alt='Logo'
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
