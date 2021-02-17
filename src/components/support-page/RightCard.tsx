import React from 'react';
import SupportCard from './SupportCard';
import CoffeeButton from '../buttons/CoffeeButton';
import styles from './SupportCard.module.scss';

interface Props {}

const RightCard: React.FC<Props> = () => {
  return (
    <SupportCard
      position='right'
      title='With Your Money'
      description='Creating, developing, and hosting a web application does not come without costs.
          In order to ensure that Open IPA thrives and that development can continue,
          please consider supporting the project financially. Your support goes a long
          way towards ensuring that Open IPA stays up, stays accurate, and continues
          to help transcribe into the future. If you would like to 
          contribute, please:'
    >
      <CoffeeButton />
      <div className={`${styles['card-link']} ${styles['card-link--mystery']}`}>
        <img
          src='assets/question-mark-white.png'
          alt='Question Mark'
          className={`${styles['button-logo']} ${styles['button-logo--question']}`}
        />
        <span className={styles['card-link-title']}>Coming Soon!</span>
      </div>
    </SupportCard>
  );
};

export default RightCard;
