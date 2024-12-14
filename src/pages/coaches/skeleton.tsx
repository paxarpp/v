import Avatar from '../../assets/avatar.svg?react';
import styles from './index.module.css';

export const CoachesSkeleton = () => {
  return (
    <div className={styles.coach_card_add}>
      <span className={styles.coach_add}>
        <Avatar />
      </span>
    </div>
  );
};
