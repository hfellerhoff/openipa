import React from 'react';
import styles from './SupportCard.module.scss';

interface Props {
  title: string;
  description: string;
  position: 'left' | 'right';
  children: JSX.Element;
}

const SupportCard: React.FC<Props> = ({
  title,
  description,
  position,
  children,
}) => {
  const className = `${styles.container} ${styles[`container--${position}`]}`;
  return (
    <div className={className}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
      <div className={styles['button-container']}>{children}</div>
    </div>
  );
};

export default SupportCard;
