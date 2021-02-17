import React from 'react';
import ReactGA from 'react-ga';
import SupportCard from './SupportCard';
import styles from './SupportCard.module.scss';

interface Props {}

const LeftCard: React.FC<Props> = () => {
  return (
    <SupportCard
      position='left'
      title='With Your Time'
      description='Open IPA is community-driven. With the amount of work that goes into the project, 
          support from the community is crucial in making Open IPA the most accurate and
          helpful tool it can be. With each language offered having its own host of rules, exceptions,
          and edge cases, it requires more than just one person to keep afloat. If you would like to 
          follow the project or take part in development, please:'
    >
      <ReactGA.OutboundLink
        className={`${styles['card-link']} ${styles['card-link--reddit']}`}
        eventLabel='Reddit'
        to='https://www.reddit.com/r/openipa/'
        target='_blank'
      >
        <img
          src='assets/reddit-white.png'
          alt='Reddit'
          className={styles['button-logo']}
        />
        <span className={styles['card-link-title']}>Join the Community</span>
      </ReactGA.OutboundLink>

      <ReactGA.OutboundLink
        className={`${styles['card-link']} ${styles['card-link--github']}`}
        eventLabel='Github'
        to='https://github.com/hfellerhoff/openipa'
        target='_blank'
      >
        <img
          src='assets/github-white.png'
          alt='GitHub'
          className={styles['button-logo']}
        />
        <span className={styles['card-link-title']}>
          Contribute to Development
        </span>
      </ReactGA.OutboundLink>
    </SupportCard>
  );
};

export default LeftCard;
