import React from 'react';

import styles from './Description.module.scss';

const Description: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles['overview-container']}>
        <div className={styles['overview-content']}>
          <h3 className={styles['overview-title']}>Real-Time</h3>
          <p className={styles['overview-paragraph']}>
            Contrary to other transcription tools, Open IPA transcribes text
            into IPA in real-time, providing instantaneous transcription in
            multiple languages to help you spend less time transcribing and more
            time singing.
          </p>
        </div>
        <div className='w-10 h-10'></div>
        <div className={styles['overview-content']}>
          <h3 className={styles['overview-title']}>Education-Focused</h3>
          <p className={styles['overview-paragraph']}>
            Many transcription tools function as a bit of a &quot;black
            box&quot;, spitting out IPA with seemingly no clear process. With
            Open IPA, transcriptions include not only the IPA but the thought
            process behind it, allowing you to better understand the
            transcriptions you use.
          </p>
        </div>
        <div className='w-10 h-10'></div>
        <div className={styles['overview-content']}>
          <h3 className={styles['overview-title']}>Community-Driven</h3>
          <p className={styles['overview-paragraph']}>
            Open IPA thrives off of contribution and feedback from the community
            of people that use it. We welcome any and all input, and greatly
            encourage users to become involed and help improve Open IPA for the
            betterment of those who use it.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Description;
